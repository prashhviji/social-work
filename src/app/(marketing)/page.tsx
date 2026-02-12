import { prisma } from "@/lib/prisma"
import { LandingPage } from "@/components/landing-page"

export default async function Page() {
    // Fetch real stats from the database for the landing page
    const [devices, students, villages, submissions] = await Promise.all([
        prisma.device.count(),
        prisma.student.count(),
        prisma.village.count(),
        prisma.submission.count(),
    ])

    return (
        <LandingPage
            stats={{
                devices,
                students,
                villages,
                submissions
            }}
        />
    )
}
