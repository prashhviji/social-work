import { prisma } from "@/lib/prisma"
import { KpiCard } from "@/components/kpi-card"
import { DashboardCharts } from "@/components/dashboard-charts"
import { Users, TabletSmartphone, GraduationCap, Clock, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

export default async function DashboardPage() {
    // Fetch data
    const [
        devicesCount,
        studentsCount,
        submissionsCount,
        recentSyncs,
        lowBatteryDevices
    ] = await Promise.all([
        prisma.device.count(),
        prisma.student.count(),
        prisma.submission.count(),
        prisma.syncEvent.findMany({
            take: 5,
            orderBy: { syncedAt: 'desc' },
            include: { device: { include: { village: true } } }
        }),
        prisma.device.findMany({
            where: {
                OR: [
                    { batteryPct: { lt: 20 } },
                    { lastSync: { lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
                ]
            },
            include: { village: true }
        })
    ])

    // Mock data for charts (in real app, aggregate from db)
    const weeklyActivity = [
        { name: "Mon", lessons: 45 },
        { name: "Tue", lessons: 52 },
        { name: "Wed", lessons: 38 },
        { name: "Thu", lessons: 65 },
        { name: "Fri", lessons: 48 },
        { name: "Sat", lessons: 59 },
        { name: "Sun", lessons: 24 },
    ]

    const subjectMastery = [
        { subject: "Math", mastery: 68 },
        { subject: "Reading", mastery: 72 },
        { subject: "Science", mastery: 45 },
        { subject: "Life Skills", mastery: 85 },
    ]

    return (
        <div className="space-y-6">
            {/* Alert Banner */}
            {lowBatteryDevices.length > 0 && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-4">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-destructive">Attention Required</h3>
                        <p className="text-sm text-destructive/80">
                            {lowBatteryDevices.length} devices have low battery or haven't synced in 7 days.
                        </p>
                        <ul className="mt-2 text-sm text-destructive/80 list-disc list-inside">
                            {lowBatteryDevices.map(d => (
                                <li key={d.id}>{d.serial} ({d.village.name}) - {d.batteryPct}% Battery</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                    title="Active Devices"
                    value={devicesCount}
                    description="Deployed across 3 villages"
                    icon={TabletSmartphone}
                    trend="up"
                    trendValue="+2"
                    color="text-ochre"
                />
                <KpiCard
                    title="Total Students"
                    value={studentsCount}
                    description="Enrolled in program"
                    icon={Users}
                    trend="up"
                    trendValue="+12%"
                    color="text-terracotta"
                />
                <KpiCard
                    title="Avg Learning Gain"
                    value="24%"
                    description="Improvement in test scores"
                    icon={GraduationCap}
                    trend="up"
                    trendValue="+4%"
                    color="text-forest"
                />
                <KpiCard
                    title="Teacher Hours Saved"
                    value="128"
                    description="This month via auto-grading"
                    icon={Clock}
                    trend="up"
                    trendValue="+15%"
                    color="text-primary"
                />
            </div>

            {/* Charts */}
            <DashboardCharts weeklyActivity={weeklyActivity} subjectMastery={subjectMastery} />

            {/* Recent Activity Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Sync Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                                <tr>
                                    <th className="px-4 py-3">Device ID</th>
                                    <th className="px-4 py-3">Village</th>
                                    <th className="px-4 py-3">Records</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentSyncs.map((sync) => (
                                    <tr key={sync.id} className="border-b hover:bg-muted/50 transition-colors">
                                        <td className="px-4 py-3 font-medium">{sync.device.serial}</td>
                                        <td className="px-4 py-3">{sync.device.village.name}</td>
                                        <td className="px-4 py-3">{sync.recordsSynced} records</td>
                                        <td className="px-4 py-3">
                                            {sync.errorsLogged > 0 ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    {sync.errorsLogged} Errors
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Success
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {formatDistanceToNow(sync.syncedAt, { addSuffix: true })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
