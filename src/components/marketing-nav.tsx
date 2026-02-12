"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function MarketingNav() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/gallery", label: "Gallery" },
        { href: "/about", label: "About" },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-xl">
                        D
                    </div>
                    <span className="font-heading font-bold text-lg tracking-tight">The Device</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href
                                    ? "text-primary font-bold"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link href="/dashboard">
                        <Button variant="default" size="sm">
                            Dashboard Login
                        </Button>
                    </Link>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-base font-medium py-2 px-4 rounded-md hover:bg-muted transition-colors",
                                pathname === item.href
                                    ? "bg-muted text-primary font-bold"
                                    : "text-foreground"
                            )}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="pt-2 border-t">
                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full">Dashboard Login</Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
