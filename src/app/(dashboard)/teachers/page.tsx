import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, Mail, Phone, MapPin } from "lucide-react"

export default async function TeachersPage() {
    let teachers: Awaited<ReturnType<typeof prisma.user.findMany>> = []
    try {
        teachers = await prisma.user.findMany({
            where: { role: "TEACHER" },
            include: { village: true }
        })
    } catch (error) {
        console.warn("Database unreachable:", error)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-heading font-bold tracking-tight">Teachers</h2>
                    <p className="text-muted-foreground">
                        Manage field educators and village coordinators.
                    </p>
                </div>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Teacher
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Naame</TableHead>
                            <TableHead>Assigned Village</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell className="font-medium">{teacher.name}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        {teacher.village?.name || "Unassigned"}
                                    </div>
                                </TableCell>
                                <TableCell>{teacher.email}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
