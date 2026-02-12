import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // Needed to create tabs component
import { SkillTree } from "@/components/skill-tree"
import { PerformanceRadar } from "@/components/performance-radar"
import { format } from "date-fns"
import { CheckCircle2, Clock, ScrollText } from "lucide-react"

export default async function StudentProfilePage({ params }: { params: { id: string } }) {
    const student = await prisma.student.findUnique({
        where: { id: params.id },
        include: {
            village: true,
            device: true,
            progress: {
                include: { skillNode: { include: { subject: true } } }
            },
            submissions: {
                orderBy: { createdAt: 'desc' },
                take: 10,
                include: { skillNode: true }
            }
        }
    })

    if (!student) notFound()

    // Process data for charts
    const masteryBySubject: Record<string, { total: number; mastered: number }> = {}
    student.progress.forEach(p => {
        const subj = p.skillNode.subject.name
        if (!masteryBySubject[subj]) masteryBySubject[subj] = { total: 0, mastered: 0 }
        masteryBySubject[subj].total += 1
        if (p.masteredAt) masteryBySubject[subj].mastered += 1
    })

    const radarData = Object.entries(masteryBySubject).map(([subject, stats]) => ({
        subject,
        score: Math.round((stats.mastered / Math.max(stats.total, 1)) * 100),
        fullMark: 100
    }))

    // Fill in missing subjects if needed for looks
    const allSubjects = ["Mathematics", "Reading", "Science", "Life Skills"]
    allSubjects.forEach(s => {
        if (!radarData.find(d => d.subject === s)) {
            radarData.push({ subject: s, score: 0, fullMark: 100 })
        }
    })

    // Construct skill tree nodes (mock structure since real recursion needs parent-child map)
    // For demo, we'll fetch one subject's tree and map status
    const mathNodes = await prisma.skillNode.findMany({
        where: { subject: { name: "Mathematics" }, level: 0 },
        include: {
            children: {
                include: { children: true }
            }
        }
    })

    // Helper to map DB node to UI node with status
    const mapNode = (node: any): any => {
        const progress = student.progress.find(p => p.skillNodeId === node.id)
        let status = "locked"
        if (progress) {
            status = progress.masteredAt ? "mastered" : "in-progress"
        } else if (node.level === 0) {
            status = "unlocked" // Roots are unlocked by default if not started
        } else {
            // Check if parent is mastered? assuming simpler logic for demo
            status = "locked"
        }

        return {
            id: node.id,
            title: node.title,
            level: node.level,
            status,
            children: node.children?.map(mapNode)
        }
    }

    const skillTreeData = mathNodes.map(mapNode)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <Avatar className="h-24 w-24 border-4 border-background shadow-warm">
                    <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                        {student.firstName.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                    <h1 className="text-3xl font-heading font-bold text-warm-900">{student.firstName}</h1>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-muted-foreground">ID: {student.id}</Badge>
                        <Badge className="bg-forest/10 text-forest hover:bg-forest/20">{student.village.name}</Badge>
                        <Badge variant="secondary">{student.ageGroup} Years Old</Badge>
                        <Badge variant="outline" className="border-ochre text-ochre">Device: {student.device.serial}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Enrolled {format(student.enrolledAt, 'MMMM d, yyyy')} • {student.progress.filter(p => p.masteredAt).length} Skills Mastered
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    <Tabs defaultValue="skills">
                        <TabsList className="mb-4">
                            <TabsTrigger value="skills">Skill Tree (Mathematics)</TabsTrigger>
                            <TabsTrigger value="timeline">Activity Timeline</TabsTrigger>
                        </TabsList>

                        <TabsContent value="skills" className="bg-card rounded-xl border p-6 min-h-[400px]">
                            <div className="flex justify-center">
                                <SkillTree subject="Mathematics" nodes={skillTreeData} />
                            </div>
                        </TabsContent>

                        <TabsContent value="timeline">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Submissions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {student.submissions.map((sub, i) => (
                                            <div key={sub.id} className="flex gap-4 relative">
                                                {i !== student.submissions.length - 1 && (
                                                    <div className="absolute left-2.5 top-8 bottom-[-24px] w-0.5 bg-muted" />
                                                )}
                                                <div className={cn(
                                                    "h-5 w-5 rounded-full flex items-center justify-center shrink-0 z-10 mt-1",
                                                    sub.status === "APPROVED" ? "bg-green-100 text-green-600" :
                                                        sub.status === "REJECTED" ? "bg-red-100 text-red-600" :
                                                            "bg-yellow-100 text-yellow-600"
                                                )}>
                                                    {sub.status === "APPROVED" ? <CheckCircle2 size={12} /> :
                                                        sub.status === "REJECTED" ? <ScrollText size={12} /> :
                                                            <Clock size={12} />}
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium leading-none">
                                                        Submitted <span className="font-bold">{sub.type.toLowerCase()}</span> for {sub.skillNode.title}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {format(sub.createdAt, 'MMM d, h:mm a')} • Status: <span className="capitalize">{sub.status.toLowerCase()}</span>
                                                    </p>
                                                    {sub.transcript && (
                                                        <div className="mt-2 text-sm bg-muted/50 p-2 rounded-md italic text-muted-foreground">
                                                            "{sub.transcript}"
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PerformanceRadar data={radarData} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Teacher Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground italic">
                                No notes added yet for {student.firstName}.
                            </div>
                            <Button variant="link" className="px-0 mt-2 text-primary">
                                + Add Note
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
