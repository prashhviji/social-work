import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, TabletSmartphone } from "lucide-react"

export default async function VillagesPage() {
    let villages: Awaited<ReturnType<typeof prisma.village.findMany>> = []
    try {
        villages = await prisma.village.findMany({
            include: {
                _count: {
                    select: {
                        students: true,
                        devices: true,
                        users: true
                    }
                }
            }
        })
    } catch (error) {
        console.warn("Database unreachable:", error)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-heading font-bold tracking-tight">Villages</h2>
                    <p className="text-muted-foreground">
                        Community hubs where devices are deployed.
                    </p>
                </div>
                <Button>
                    <MapPin className="mr-2 h-4 w-4" />
                    Add Village
                </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {villages.map((village) => (
                    <Card key={village.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-bold">{village.name}</CardTitle>
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2 mt-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <Users className="h-4 w-4" /> Students
                                    </span>
                                    <span className="font-bold">{village._count.students}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <TabletSmartphone className="h-4 w-4" /> Devices
                                    </span>
                                    <span className="font-bold">{village._count.devices}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <Users className="h-4 w-4" /> Staff
                                    </span>
                                    <span className="font-bold">{village._count.users}</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                                Region: {village.region} • Language: {village.language}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
