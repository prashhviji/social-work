"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from "recharts"

interface DashboardChartsProps {
    weeklyActivity: { name: string; lessons: number }[]
    subjectMastery: { subject: string; mastery: number }[]
}

export function DashboardCharts({ weeklyActivity, subjectMastery }: DashboardChartsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Weekly Lessons Completed</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={weeklyActivity}>
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#FAF7F2", borderRadius: "8px", border: "1px solid #E5B87A" }}
                                itemStyle={{ color: "#C8893A" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="lessons"
                                stroke="#C8893A"
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Subject Mastery</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={subjectMastery}>
                            <XAxis
                                dataKey="subject"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}%`}
                            />
                            <Tooltip
                                cursor={{ fill: '#FAF7F2' }}
                                contentStyle={{ backgroundColor: "#FAF7F2", borderRadius: "8px", border: "1px solid #2D5016" }}
                            />
                            <Bar
                                dataKey="mastery"
                                fill="#2D5016"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
