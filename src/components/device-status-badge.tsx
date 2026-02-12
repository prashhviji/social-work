import { Badge } from "@/components/ui/badge"

interface DeviceStatusBadgeProps {
    status: string // ONLINE | OFFLINE | LOW_POWER | MAINTENANCE
}

export function DeviceStatusBadge({ status }: DeviceStatusBadgeProps) {
    const styles = {
        ONLINE: "bg-green-100 text-green-800 hover:bg-green-200",
        OFFLINE: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        LOW_POWER: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        MAINTENANCE: "bg-red-100 text-red-800 hover:bg-red-200",
    }

    const labels = {
        ONLINE: "Online",
        OFFLINE: "Offline",
        LOW_POWER: "Low Battery",
        MAINTENANCE: "Maintenance",
    }

    return (
        <Badge className={`font-medium border-0 ${styles[status as keyof typeof styles] || styles.OFFLINE}`}>
            {labels[status as keyof typeof labels] || status}
        </Badge>
    )
}
