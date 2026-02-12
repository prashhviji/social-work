import { prisma } from "@/lib/prisma"
import { StudentList } from "@/components/students/student-list"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

export default async function StudentsPage() {
    const students = await prisma.student.findMany({
        include: {
            village: true,
            device: true,
            _count: {
                select: {
                    progress: true,
                    submissions: true
                }
            }
        },
        orderBy: { enrolledAt: 'desc' }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-heading font-bold tracking-tight">Students</h2>
                    <p className="text-muted-foreground">
                        Manage student enrollment and track progress across villages.
                    </p>
                </div>
                < Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Enrol Student
                </Button>
            </div>

            <StudentList students={students} />
        </div>
    )
}
