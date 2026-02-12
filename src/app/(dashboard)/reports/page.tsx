import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileDown, FileBarChart, CalendarRange } from "lucide-react"

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-heading font-bold tracking-tight">Reports</h2>
                <p className="text-muted-foreground">
                    Download aggregated data for analysis and external reporting.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileBarChart className="h-5 w-5 text-primary" />
                            Impact Assessment
                        </CardTitle>
                        <CardDescription>Monthly learning outcomes summary</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Contains aggregated student mastery data, time spent per subject, and improvement metrics.
                        </p>
                        <Button variant="outline" className="w-full">
                            <FileDown className="mr-2 h-4 w-4" /> Download PDF
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarRange className="h-5 w-5 text-primary" />
                            Device Utilization
                        </CardTitle>
                        <CardDescription>Uptime and usage logs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Detailed logs of device power cycles, battery health, and active learning hours per village.
                        </p>
                        <Button variant="outline" className="w-full">
                            <FileDown className="mr-2 h-4 w-4" /> Download CSV
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            Student Roster
                        </CardTitle>
                        <CardDescription>Full enrollment data</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            List of all enrolled students, their age groups, and assigned villages/devices.
                        </p>
                        <Button variant="outline" className="w-full">
                            <FileDown className="mr-2 h-4 w-4" /> Download Excel
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function Users(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}
