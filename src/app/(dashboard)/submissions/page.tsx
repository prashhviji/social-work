import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDistanceToNow } from "date-fns"
import { Check, X, Eye } from "lucide-react"

export default async function SubmissionsPage() {
    let submissions: Awaited<ReturnType<typeof prisma.submission.findMany>> = []
    try {
        submissions = await prisma.submission.findMany({
            where: { status: 'PENDING' },
            include: {
                student: { include: { village: true } },
                skillNode: { include: { subject: true } }
            },
            orderBy: { createdAt: 'desc' }
        })
    } catch (error) {
        console.warn("Database unreachable:", error)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-heading font-bold tracking-tight">Submission Queue</h2>
                    <p className="text-muted-foreground">
                        {submissions.length} pending submissions require teacher review.
                    </p>
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Skill</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {submissions.map((sub) => (
                            <TableRow key={sub.id}>
                                <TableCell>
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary/10 text-primary">{sub.student.firstName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{sub.student.firstName}</div>
                                    <div className="text-xs text-muted-foreground">{sub.student.village.name}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{sub.skillNode.subject.name}</Badge>
                                </TableCell>
                                <TableCell>{sub.skillNode.title}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="font-mono text-xs capitalize">
                                        {sub.type.toLowerCase()}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {formatDistanceToNow(sub.createdAt, { addSuffix: true })}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/submissions/${sub.id}`}>
                                            <Button size="sm" variant="outline">
                                                <Eye className="h-4 w-4 mr-1" />
                                                Review
                                            </Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {submissions.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                    No pending submissions. Great job!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
