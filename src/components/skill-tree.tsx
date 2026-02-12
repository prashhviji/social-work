"use client"

import { cn } from "@/lib/utils"
import { Check, Lock, Star } from "lucide-react"

interface SkillNode {
    id: string
    title: string
    level: number
    status: "locked" | "unlocked" | "mastered" | "in-progress"
    children?: SkillNode[]
}

interface SkillTreeProps {
    subject: string
    nodes: SkillNode[]
}

export function SkillTree({ subject, nodes }: SkillTreeProps) {
    const renderNode = (node: SkillNode, depth: number = 0) => {
        const isMastered = node.status === "mastered"
        const isLocked = node.status === "locked"
        const isInProgress = node.status === "in-progress"

        return (
            <div key={node.id} className="relative flex flex-col items-center">
                {/* Connection line to parent */}
                {depth > 0 && (
                    <div className="absolute -top-8 w-0.5 h-8 bg-muted-foreground/30" />
                )}

                <div
                    className={cn(
                        "relative z-10 flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 w-48 text-center bg-card shadow-sm hover:shadow-md",
                        isMastered ? "border-ochre bg-ochre/5" :
                            isInProgress ? "border-primary bg-primary/5" :
                                isLocked ? "border-muted bg-muted/50 opacity-70" :
                                    "border-muted bg-card"
                    )}
                >
                    <div className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center mb-2 shadow-inner",
                        isMastered ? "bg-ochre text-white" :
                            isInProgress ? "bg-primary text-white" :
                                isLocked ? "bg-muted text-muted-foreground" :
                                    "bg-secondary text-secondary-foreground"
                    )}>
                        {isMastered ? <Check size={20} className="stroke-[3]" /> :
                            isLocked ? <Lock size={18} /> :
                                <Star size={18} className={isInProgress ? "fill-white/20" : ""} />}
                    </div>

                    <h4 className="font-semibold text-sm leading-tight mb-1">{node.title}</h4>
                    <span className="text-xs text-muted-foreground capitalize">{node.status.replace("-", " ")}</span>
                </div>

                {/* Children container */}
                {node.children && node.children.length > 0 && (
                    <div className="flex gap-8 mt-8 relative">
                        {/* Horizontal connector bar */}
                        {node.children.length > 1 && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-0.5 bg-muted-foreground/30" style={{ width: `calc(100% - ${2 * 48}px)` }} />
                        )}
                        {/* Note: perfect horizontal line math is hard without fixed widths, simplifying */}

                        {node.children.map(child => (
                            <div key={child.id} className="relative pt-8">
                                {/* Vertical connector from horizontal bar to child */}
                                {/* This is handled by renderNode's top-8 line */}
                                {renderNode(child, depth + 1)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="overflow-x-auto py-8">
            <div className="min-w-max flex justify-center">
                {nodes.map(rootNode => renderNode(rootNode))}
            </div>
        </div>
    )
}
