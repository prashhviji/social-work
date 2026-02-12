
import { prisma } from "../src/lib/prisma"

async function main() {
    const email = "admin@project.org"
    const password = "admin123"

    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                password: password, // In production, hash this!
                role: "ADMIN",
                name: "Admin User"
            },
            create: {
                email,
                password,
                role: "ADMIN",
                name: "Admin User"
            }
        })
        console.log("Admin user created/updated:", user)
    } catch (e) {
        console.error("Error creating admin:", e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
