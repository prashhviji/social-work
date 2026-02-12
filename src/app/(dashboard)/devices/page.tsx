import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DeviceStatusBadge } from "@/components/device-status-badge"
import { Battery, Signal, Sun, Calendar, ChevronRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default async function DevicesPage() {
    const devices = await prisma.device.findMany({
        include: {
            village: true,
            _count: { select: { students: true } }
        },
        orderBy: { villageId: 'asc' }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-heading font-bold tracking-tight">Device Registry</h2>
                    <p className="text-muted-foreground">
                        Monitor fleet status, battery health, and sync activity.
                    </p>
                </div>
                <Button variant="outline">Refresh Status</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {devices.map((device) => (
                    <Link key={device.id} href={`/devices/${device.id}`}>
                        <div className="group relative flex flex-col gap-4 rounded-lg border p-6 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">{device.serial}</h3>
                                    <p className="text-sm text-muted-foreground">{device.village.name}</p>
                                </div>
                                <DeviceStatusBadge status={device.deviceStatus} />
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Battery className={`h-4 w-4 ${device.batteryPct < 20 ? "text-red-500" : "text-muted-foreground"}`} />
                                    <span className={device.batteryPct < 20 ? "text-red-600 font-medium" : ""}>
                                        {device.batteryPct}%
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Sun className="h-4 w-4 text-ochre" />
                                    <span>{device.solarStatus}</span>
                                </div>
                                <div className="flex items-center gap-2 col-span-2">
                                    <Signal className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        Synced {device.lastSync ? formatDistanceToNow(device.lastSync, { addSuffix: true }) : 'Never'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t pt-4 mt-2">
                                <div className="text-xs text-muted-foreground">
                                    v{device.contentVersion} • {device.uptimePct}% Uptime
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
