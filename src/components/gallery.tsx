"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, ZoomIn } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface GalleryItem {
    id: string
    title: string
    studentName: string
    village: string
    imageUrl: string // For demo, will use placeholder services if real not avail
    subject: string
}

export function Gallery({ items }: { items: GalleryItem[] }) {
    const [filter, setFilter] = useState("All")
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const uniqueSubjects = ["All", ...Array.from(new Set(items.map(i => i.subject)))]

    const filteredItems = filter === "All"
        ? items
        : items.filter(i => i.subject === filter)

    return (
        <div className="space-y-8">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2">
                {uniqueSubjects.map(subject => (
                    <Button
                        key={subject}
                        variant={filter === subject ? "default" : "outline"}
                        onClick={() => setFilter(subject)}
                        className={filter === subject ? "bg-ochre hover:bg-ochre-dark text-white" : ""}
                    >
                        {subject}
                    </Button>
                ))}
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                <AnimatePresence>
                    {filteredItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layoutId={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer"
                            onClick={() => setSelectedId(item.id)}
                        >
                            <div className="aspect-[3/4] bg-stone-200 relative">
                                {/* In real app use Next Image, here placeholder div with color */}
                                <div className="absolute inset-0 bg-stone-300 flex items-center justify-center text-stone-500">
                                    Image {item.id}
                                </div>
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <p className="text-sm opacity-90">by {item.studentName}</p>
                                    <Badge variant="secondary" className="mt-2 w-fit bg-white/20 text-white hover:bg-white/30 border-0">
                                        {item.subject}
                                    </Badge>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Lightbox Dialog */}
            <Dialog open={!!selectedId} onOpenChange={(open) => !open && setSelectedId(null)}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none text-white">
                    {selectedId && (() => {
                        const item = items.find(i => i.id === selectedId)
                        if (!item) return null
                        return (
                            <div className="relative bg-black/95 rounded-lg overflow-hidden flex flex-col md:flex-row max-h-[85vh]">
                                <div className="flex-1 bg-stone-900 flex items-center justify-center min-h-[300px]">
                                    <div className="text-stone-500">Full Image {item.id}</div>
                                </div>
                                <div className="w-full md:w-80 p-8 flex flex-col bg-stone-900 border-l border-white/10">
                                    <h2 className="text-2xl font-bold mb-1">{item.title}</h2>
                                    <p className="text-stone-400 mb-6">by {item.studentName} from {item.village}</p>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-xs uppercase tracking-wider text-stone-500 mb-1">Subject</h4>
                                            <p>{item.subject}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs uppercase tracking-wider text-stone-500 mb-1">Teacher Note</h4>
                                            <p className="italic text-stone-300">"Excellent use of color and perspective. Shows deep understanding of the local flora."</p>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-8">
                                        <Button className="w-full bg-white text-black hover:bg-stone-200">
                                            Download High-Res
                                        </Button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute top-4 right-4 md:left-4 z-50 p-2 bg-black/50 rounded-full hover:bg-white/20 text-white"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                        )
                    })()}
                </DialogContent>
            </Dialog>
        </div>
    )
}
