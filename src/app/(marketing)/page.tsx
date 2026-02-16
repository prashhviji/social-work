import { prisma } from "@/lib/prisma"
import { LandingPage } from "@/components/landing-page"

export default async function Page() {
    let stats = { devices: 0, students: 0, villages: 0, submissions: 0 }

    try {
        const [devices, students, villages, submissions] = await Promise.all([
            prisma.device.count(),
            prisma.student.count(),
            prisma.village.count(),
            prisma.submission.count(),
        ])
        stats = { devices, students, villages, submissions }
    } catch (error) {
        console.warn("Database unreachable, using fallback stats:", error)
    }

    return <LandingPage stats={stats} />
}
