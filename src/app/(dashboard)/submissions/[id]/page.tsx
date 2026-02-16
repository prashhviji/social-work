import { prisma } from "@/lib/prisma"
import type { Prisma } from "@prisma/client"
import { notFound } from "next/navigation"
import { SubmissionReviewForm } from "@/components/submission-review-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertCircle, BrainCircuit } from "lucide-react"

type SubmissionWithRelations = Prisma.SubmissionGetPayload<{
    include: { student: { include: { village: true } }; skillNode: { include: { subject: true } } }
}>

export default async function SubmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let submission: SubmissionWithRelations | null = null
    try {
        submission = await prisma.submission.findUnique({
            where: { id },
            include: {
                student: { include: { village: true } },
                skillNode: { include: { subject: true } }
            }
        })
    } catch (error) {
        console.warn("Database unreachable:", error)
        notFound()
    }

    if (!submission) notFound()

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                        {submission.student.firstName.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl font-heading font-bold">{submission.skillNode.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <span>{submission.student.firstName}</span>
                        <span>•</span>
                        <span>{submission.student.village.name}</span>
                        <span>•</span>
                        <Badge variant="outline">{submission.skillNode.subject.name}</Badge>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    {/* Submission Content */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Submission Content</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {submission.type === "PHOTO" ? (
                                <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative overflow-hidden">
                                    {/* Placeholder for actual image */}
                                    <div className="text-center p-8">
                                        <p className="text-muted-foreground mb-2">Photo Submission</p>
                                        {submission.fileUrl && (
                                            <p className="font-mono text-xs bg-muted-foreground/10 px-2 py-1 rounded">
                                                {submission.fileUrl}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 bg-muted/30 rounded-md">
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <BrainCircuit className="h-4 w-4 text-primary" />
                                        Transcribed Audio
                                    </h3>
                                    <p className="italic text-lg text-muted-foreground font-serif leading-relaxed">
                                        "{submission.transcript || "No transcript available."}"
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* AI Insights (Mock) */}
                    <Card className="bg-ochre/5 border-ochre/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-ochre flex items-center gap-2 text-base">
                                <BrainCircuit className="h-4 w-4" />
                                AI Analysis
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium">Concept Mastery Confidence</span>
                                <Badge className="bg-ochre text-white hover:bg-ochre-dark">
                                    {Math.round(Math.random() * 20 + 70)}% High
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                The student demonstrates clear understanding of the core concepts. Key terminology was used correctly in the verbal explanation. Recommendation: Approve mastery.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <SubmissionReviewForm
                        submissionId={submission.id}
                        studentName={submission.student.firstName}
                    />
                </div>
            </div>
        </div>
    )
}
