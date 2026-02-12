import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

// Basic middleware to protect dashboard routes
export default auth((req) => {
    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard")

    if (isDashboard && !req.auth) {
        return NextResponse.redirect(new URL("/login", req.nextUrl))
    }

    // Also protect specific dashboard sub-routes like /students etc.

    return NextResponse.next()
})

export const config = {
    matcher: ["/dashboard/:path*", "/students/:path*", "/devices/:path*", "/submissions/:path*", "/teachers/:path*", "/villages/:path*", "/reports/:path*"],
}
