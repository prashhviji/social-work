"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Users,
    MapPin,
    LayoutDashboard,
    LogOut,
    Settings,
    UserCircle,
    TabletSmartphone,
    FileCheck,
    BarChart3
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
// For now import signIn/signOut from next-auth/react in client component? 
// No, next-auth v5 uses server actions mostly, but useSession works in client.
// Actually signOut in v5 is server-side friendly. For client, we can use signIn/signOut from 'next-auth/react' if using SessionProvider.
import { signOut, useSession } from "next-auth/react"

export function DashboardSidebar() {
    const pathname = usePathname()
    const { data: session } = useSession()

    const navItems = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/students", label: "Students", icon: Users },
        { href: "/devices", label: "Devices", icon: TabletSmartphone },
        { href: "/submissions", label: "Submissions", icon: FileCheck },
        { href: "/teachers", label: "Teachers", icon: UserCircle },
        { href: "/villages", label: "Villages", icon: MapPin },
        { href: "/reports", label: "Reports", icon: BarChart3 },
    ]

    return (
        <div className="flex flex-col h-screen border-r bg-muted/10 w-64 fixed left-0 top-0">
            <div className="h-16 flex items-center px-6 border-b bg-background">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-xl">
                        D
                    </div>
                    <span className="font-heading font-bold text-lg tracking-tight">The Device</span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                            pathname.startsWith(item.href) && item.href !== "/dashboard" || pathname === item.href
                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t bg-background">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start px-2 hover:bg-muted/50">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {session?.user?.name?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start text-left">
                                    <span className="text-sm font-medium truncate w-[140px]">
                                        {session?.user?.name || "User"}
                                    </span>
                                    <span className="text-xs text-muted-foreground truncate w-[140px]">
                                        {session?.user?.email || "user@example.com"}
                                    </span>
                                </div>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
