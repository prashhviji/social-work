import { MarketingNav } from "@/components/marketing-nav"

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <MarketingNav />
            <main className="flex-1 pt-16">{children}</main>
            <footer className="border-t bg-muted/30 py-12">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    <p className="mb-4">
                        Built for rural education initiatives. Open source and community owned.
                    </p>
                    <div className="flex justify-center gap-6">
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact</a>
                    </div>
                    <p className="mt-8 text-xs text-muted-foreground/60">
                        © 2026 The Device Project. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
