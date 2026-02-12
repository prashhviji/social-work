import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Globe, Heart, Sprout } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-20">
            {/* Hero */}
            <section className="bg-warm-900 text-cream py-20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Bridging the Digital Divide</h1>
                    <p className="text-xl opacity-90 leading-relaxed">
                        We believe that every child deserves access to quality education, regardless of grid connectivity or internet access.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-heading font-bold text-warm-900">Our Mission</h2>
                            <p className="text-lg text-warm-700 leading-relaxed">
                                To deploy 10,000 offline adaptive learning kiosks across rural India by 2026, empowering 500,000 students with self-paced learning tools.
                            </p>
                            <div className="space-y-4 pt-4">
                                <div className="flex gap-4">
                                    <div className="bg-green-100 p-2 rounded-full h-fit text-green-700"><Sprout size={24} /></div>
                                    <div>
                                        <h3 className="font-bold text-lg">Sustainable Design</h3>
                                        <p className="text-warm-600">Built with e-waste reduction and solar efficiency at the core.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-ochre/20 p-2 rounded-full h-fit text-ochre-dark"><Heart size={24} /></div>
                                    <div>
                                        <h3 className="font-bold text-lg">Community First</h3>
                                        <p className="text-warm-600">Villages own the hardware. We provide the software and support.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-stone-200 rounded-2xl aspect-square flex items-center justify-center text-stone-500">
                            Mission Image Placeholder
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-cream">
                <div className="container mx-auto px-4 max-w-6xl text-center">
                    <h2 className="text-3xl font-heading font-bold text-warm-900 mb-12">Meet the Team</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <Card key={i} className="border-none bg-white shadow-warm-md">
                                <CardContent className="p-6">
                                    <div className="w-24 h-24 bg-stone-200 rounded-full mx-auto mb-4" />
                                    <h3 className="font-bold text-lg">Team Member {i}</h3>
                                    <p className="text-sm text-ochre font-medium mb-2">Role Title</p>
                                    <p className="text-sm text-warm-600">Passionate about ed-tech and rural development.</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-forest text-cream text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-heading font-bold mb-6">Join the Movement</h2>
                    <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                        Whether you're a developer, educator, or donor, there's a place for you in our mission.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button size="lg" className="bg-ochre hover:bg-ochre-dark text-white rounded-full px-8">
                            Partner With Us
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-forest hover:bg-white hover:text-forest rounded-full px-8">
                            Donate
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
