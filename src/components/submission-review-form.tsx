"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Check, X, Loader2 } from "lucide-react"

// Create a server action or API route handler later, for now simulate
// Actually, using fetch to API route is better for client interactions

const reviewSchema = z.object({
    status: z.enum(["APPROVED", "REJECTED"]),
    teacherNote: z.string().min(1, "Feedback is required"),
    score: z.number().min(0).max(100).optional(),
})

type ReviewFormValues = z.infer<typeof reviewSchema>

interface SubmissionReviewFormProps {
    submissionId: string
    studentName: string
}

export function SubmissionReviewForm({ submissionId, studentName }: SubmissionReviewFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            status: "APPROVED",
            teacherNote: "",
            score: 85
        }
    })

    const status = watch("status")

    const onSubmit = async (data: ReviewFormValues) => {
        setIsSubmitting(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            // In real app: await fetch(`/api/submissions/${submissionId}`, { method: 'PATCH', body: JSON.stringify(data) })
            console.log("Submitted review:", data)
            setSuccess(data.status === "APPROVED" ? "Submission approved!" : "Submission rejected.")
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (success) {
        return (
            <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6 text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto text-green-600">
                        <Check className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium text-green-900">{success}</h3>
                    <p className="text-green-700">Redirecting to queue...</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Teacher Validation</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Decision</Label>
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant={status === "APPROVED" ? "default" : "outline"}
                                className={status === "APPROVED" ? "bg-green-600 hover:bg-green-700" : ""}
                                onClick={() => setValue("status", "APPROVED")}
                            >
                                <Check className="mr-2 h-4 w-4" /> Approve
                            </Button>
                            <Button
                                type="button"
                                variant={status === "REJECTED" ? "destructive" : "outline"}
                                onClick={() => setValue("status", "REJECTED")}
                            >
                                <X className="mr-2 h-4 w-4" /> Reject
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="score">Score (0-100)</Label>
                        <Input
                            id="score"
                            type="number"
                            {...register("score", { valueAsNumber: true })}
                        />
                        {errors.score && <p className="text-sm text-destructive">{errors.score.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="teacherNote">Feedback for {studentName}</Label>
                        <Textarea
                            id="teacherNote"
                            placeholder={`Write a note to ${studentName}...`}
                            className="min-h-[100px]"
                            {...register("teacherNote")}
                        />
                        {errors.teacherNote && <p className="text-sm text-destructive">{errors.teacherNote.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Submit Review
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
