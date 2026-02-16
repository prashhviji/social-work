"use client"

import { motion } from "framer-motion"
import { ArrowRight, Battery, Cpu, Globe, Users, BookOpen, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface LandingPageProps {
    stats: {
        devices: number
        students: number
        villages: number
        submissions: number
    }
}

export function LandingPage({ stats }: LandingPageProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 px-4 overflow-hidden bg-cream">
                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="text-center space-y-8"
                    >
                        <motion.h1
                            variants={item}
                            className="text-5xl md:text-7xl font-heading font-black tracking-tight text-warm-900"
                        >
                            A library that <span className="text-ochre">talks back</span>.
                        </motion.h1>

                        <motion.p
                            variants={item}
                            className="text-xl md:text-2xl text-warm-700 max-w-2xl mx-auto leading-relaxed"
                        >
                            The offline, solar-powered adaptive learning kiosk designed for rural communities. No internet required.
                        </motion.p>

                        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link href="/gallery">
                                <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-ochre hover:bg-ochre-dark text-white">
                                    View Gallery <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full border-warm-400 text-warm-800 hover:bg-warm-100">
                                    Dashboard
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Background blobs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ochre/10 rounded-full blur-3xl -z-0 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-terracotta/10 rounded-full blur-3xl -z-0 pointer-events-none" />
            </section>

            {/* Stats Bar */}
            <section className="bg-warm-800 text-cream py-12 border-y border-warm-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-4xl font-heading font-bold text-ochre">{stats.devices}</div>
                            <div className="text-sm uppercase tracking-wider opacity-80">Active Devices</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-heading font-bold text-terracotta">{stats.students}</div>
                            <div className="text-sm uppercase tracking-wider opacity-80">Students Reached</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-heading font-bold text-forest-light">{stats.villages}</div>
                            <div className="text-sm uppercase tracking-wider opacity-80">Villages</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-heading font-bold text-ochre">{stats.submissions}</div>
                            <div className="text-sm uppercase tracking-wider opacity-80">Learner Submissions</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-warm-900 mb-4">Built for the last mile</h2>
                        <p className="text-lg text-warm-600 max-w-2xl mx-auto">Requires no grid power, no internet connectivity, and zero teacher supervision.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-none shadow-warm-lg hover:shadow-warm-xl transition-all duration-300 transform hover:-translate-y-1 bg-cream-dark/30">
                            <CardContent className="p-8 space-y-4">
                                <div className="h-14 w-14 rounded-2xl bg-forest/10 text-forest flex items-center justify-center mb-4">
                                    <Cpu className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-warm-900">Offline AI Learning</h3>
                                <p className="text-warm-600 leading-relaxed">
                                    On-device models adapt content to each student's pace without needing cloud connectivity or expensive data plans.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-warm-lg hover:shadow-warm-xl transition-all duration-300 transform hover:-translate-y-1 bg-cream-dark/30">
                            <CardContent className="p-8 space-y-4">
                                <div className="h-14 w-14 rounded-2xl bg-ochre/10 text-ochre flex items-center justify-center mb-4">
                                    <Battery className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-warm-900">Solar Powered</h3>
                                <p className="text-warm-600 leading-relaxed">
                                    Integrated 15W panel and 100Wh battery ensure all-day operation even during monsoon season.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-warm-lg hover:shadow-warm-xl transition-all duration-300 transform hover:-translate-y-1 bg-cream-dark/30">
                            <CardContent className="p-8 space-y-4">
                                <div className="h-14 w-14 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center mb-4">
                                    <Users className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-warm-900">Community Owned</h3>
                                <p className="text-warm-600 leading-relaxed">
                                    Managed by local "Village Education Committees" who track usage and ensure device safety.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="py-24 bg-forest text-cream relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
                    <BookOpen className="h-12 w-12 mx-auto mb-8 opacity-50" />
                    <blockquote className="text-2xl md:text-4xl font-heading font-medium leading-tight mb-8">
                        "Before The Device, children in Sunderpura waited for the weekly teacher visit. Now they learn every single day."
                    </blockquote>
                    <cite className="not-italic text-lg opacity-80 font-medium">
                        — Ravi Kumar, Head Teacher, Udaipur District
                    </cite>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.png')] opacity-5 mix-blend-overlay" />
            </section>
        </div>
    )
}
