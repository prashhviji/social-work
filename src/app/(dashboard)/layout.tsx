import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-muted/10">
            <DashboardSidebar />
            <div className="pl-64 min-h-screen flex flex-col">
                <header className="h-16 border-b bg-background/80 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between">
                    <h1 className="text-xl font-heading font-bold text-foreground">
                        {/* Breadcrumb or dynamic title could go here */}
                        Dashboard
                    </h1>
                    {/* Topbar actions (search, notifications) could go here */}
                </header>
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
