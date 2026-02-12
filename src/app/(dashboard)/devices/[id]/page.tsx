import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { DeviceStatusBadge } from "@/components/device-status-badge"
import { PowerChart } from "@/components/power-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table" // Using implicit table styles if component not found, but shadcn table structure is standard div-based usually or table. I'll use standard table classes matching shadcn.
import { format } from "date-fns"
import { Battery, Sun, Signal, Wifi, Activity, AlertCircle } from "lucide-react"

export default async function DeviceDetailPage({ params }: { params: { id: string } }) {
    const device = await prisma.device.findUnique({
        where: { id: params.id },
        include: {
            village: true,
            syncEvents: {
                orderBy: { syncedAt: 'desc' },
                take: 20
            },
            powerLogs: {
                where: { loggedAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }, // Last 24h
                orderBy: { loggedAt: 'asc' }
            }
        }
    })

    if (!device) notFound()

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold flex items-center gap-3">
                        {device.serial}
                        <DeviceStatusBadge status={device.deviceStatus} />
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Deployed in {device.village.name} • v{device.contentVersion}
                    </p>
                </div>
                <div className="flex gap-4 text-sm">
                    <div className="flex flex-col items-end">
                        <span className="text-muted-foreground">Last Sync</span>
                        <span className="font-medium">{device.lastSync ? format(device.lastSync, 'MMM d, h:mm a') : 'Never'}</span>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className={`p-3 rounded-full ${device.batteryPct < 20 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            <Battery className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{device.batteryPct}%</div>
                            <div className="text-xs text-muted-foreground">Battery Level</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 rounded-full bg-ochre/10 text-ochre">
                            <Sun className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold capitalize">{device.solarStatus.toLowerCase()}</div>
                            <div className="text-xs text-muted-foreground">Solar Status</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                            <Activity className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{device.uptimePct}%</div>
                            <div className="text-xs text-muted-foreground">Uptime (7d)</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 rounded-full bg-gray-100 text-gray-600">
                            <Wifi className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{device.syncEvents.length}</div>
                            <div className="text-xs text-muted-foreground">Syncs (All time)</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Power Chart */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Power Logs (Last 24h)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PowerChart data={device.powerLogs} />
                    </CardContent>
                </Card>

                {/* Sync Log */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Sync Logs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                            {device.syncEvents.map(event => (
                                <div key={event.id} className="flex gap-3 text-sm border-b pb-3 last:border-0">
                                    <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${event.errorsLogged > 0 ? 'bg-red-500' : 'bg-green-500'}`} />
                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between">
                                            <span className="font-medium">
                                                {event.errorsLogged > 0 ? 'Sync Error' : 'Sync Success'}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {format(event.syncedAt, 'MMM d, HH:mm')}
                                            </span>
                                        </div>
                                        <div className="text-muted-foreground text-xs">
                                            {event.recordsSynced} records processed
                                        </div>
                                        {event.errorsLogged > 0 && (
                                            <div className="flex items-center gap-1 text-red-600 text-xs">
                                                <AlertCircle className="h-3 w-3" />
                                                {event.errorsLogged} errors occurred
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
