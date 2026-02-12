import { prisma } from "@/lib/prisma"
import { Gallery } from "@/components/gallery"

export default async function GalleryPage() {
    // Mock data since we likely lack real image uploads in seed
    const mockItems = Array.from({ length: 12 }).map((_, i) => ({
        id: `art-${i}`,
        title: ["Sunset Over Village", "Geometry in Nature", "My Family", "Future City"][i % 4],
        studentName: ["Aarav", "Priya", "Rohan", "Ananya"][i % 4],
        village: ["Sunderpura", "Belkheda", "Chitrakoot"][i % 3],
        imageUrl: `/placeholders/art-${i}.jpg`,
        subject: ["Art", "Mathematics", "Social Science", "Science"][i % 4]
    }))

    return (
        <div className="min-h-screen pt-24 pb-16 bg-stone-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-warm-900 mb-4">
                        Learner Gallery
                    </h1>
                    <p className="text-lg text-warm-600">
                        A showcase of creativity and problem-solving from our students across rural India.
                    </p>
                </div>

                <Gallery items={mockItems} />
            </div>
        </div>
    )
}
