"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { format } from "date-fns"

interface PowerChartProps {
    data: {
        loggedAt: Date
        panelWatts: number
        batteryPct: number
        consumptionWatts: number
    }[]
}

export function PowerChart({ data }: PowerChartProps) {
    const chartData = data.map(d => ({
        ...d,
        time: format(new Date(d.loggedAt), "HH:mm"),
        date: format(new Date(d.loggedAt), "MMM d"),
    }))

    return (
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C8893A" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#C8893A" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorBatt" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2D5016" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#2D5016" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="time"
                        tick={{ fontSize: 12, fill: '#888' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: '#888' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <CartesianGrid vertical={false} stroke="#eee" />
                    <Tooltip
                        labelFormatter={(label) => `Time: ${label}`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="panelWatts"
                        stroke="#C8893A"
                        fillOpacity={1}
                        fill="url(#colorPv)"
                        name="Solar Input (W)"
                    />
                    <Area
                        type="monotone"
                        dataKey="consumptionWatts"
                        stroke="#B84C27"
                        fill="none"
                        strokeDasharray="5 5"
                        name="Load (W)"
                    />
                    <Area
                        type="monotone"
                        dataKey="batteryPct"
                        stroke="#2D5016"
                        fillOpacity={1}
                        fill="url(#colorBatt)"
                        name="Battery %"
                        yAxisId={0}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
