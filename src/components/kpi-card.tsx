import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

interface KpiCardProps {
    title: string
    value: string | number
    description: string
    icon: React.ElementType
    trend?: "up" | "down" | "neutral"
    trendValue?: string
    color?: string // text color class for value
}

export function KpiCard({ title, value, description, icon: Icon, trend, trendValue, color }: KpiCardProps) {
    return (
        <Card className="hover:shadow-warm-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold font-heading ${color || ""}`}>{value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                    {trend === "up" && <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />}
                    {trend === "down" && <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />}
                    {trend === "neutral" && <Minus className="mr-1 h-3 w-3" />}
                    <span className={trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : ""}>
                        {trendValue}
                    </span>
                    <span className="ml-1">{description}</span>
                </div>
            </CardContent>
        </Card>
    )
}
