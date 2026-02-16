"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
interface Student {
    id: string
    firstName: string
    ageGroup: string
    village: { name: string }
    device: { serial: string; id: string }
    enrolledAt: Date
    _count: { progress: number; submissions: number }
}

export function StudentList({ students }: { students: Student[] }) {
    const [search, setSearch] = useState("")
    const [villageFilter, setVillageFilter] = useState<string | null>(null)

    const uniqueVillages = Array.from(new Set(students.map(s => s.village.name)))

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.firstName.toLowerCase().includes(search.toLowerCase()) ||
            student.village.name.toLowerCase().includes(search.toLowerCase())

        if (villageFilter && student.village.name !== villageFilter) return false
        return matchesSearch
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 max-w-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search students..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by Village</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setVillageFilter(null)}>
                                All Villages
                            </DropdownMenuItem>
                            {uniqueVillages.map(v => (
                                <DropdownMenuItem key={v} onClick={() => setVillageFilter(v)}>
                                    {v}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="text-sm text-muted-foreground text-right hidden md:block">
                    Showing {filteredStudents.length} of {students.length} students
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[80px]">Avatar</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Village</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Age Group</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Progress</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Device</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {filteredStudents.map((student) => (
                                <tr
                                    key={student.id}
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                >
                                    <td className="p-4 align-middle">
                                        <Avatar className="h-9 w-9">
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                {student.firstName.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </td>
                                    <td className="p-4 align-middle font-medium">
                                        <Link href={`/students/${student.id}`} className="hover:underline hover:text-primary">
                                            {student.firstName}
                                        </Link>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <Badge variant="secondary" className="font-normal text-muted-foreground">
                                            {student.village.name}
                                        </Badge>
                                    </td>
                                    <td className="p-4 align-middle">{student.ageGroup}</td>
                                    <td className="p-4 align-middle">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-xs font-medium">{student._count.progress} Skills</div>
                                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-forest"
                                                    style={{ width: `${Math.min(100, (student._count.progress / 20) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle font-mono text-xs text-muted-foreground">
                                        {student.device.serial}
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <Link href={`/students/${student.id}`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <ChevronRight className="h-4 w-4" />
                                                <span className="sr-only">View Details</span>
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {filteredStudents.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                                        No students found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
