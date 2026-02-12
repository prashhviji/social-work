import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string
            role: string
            villageId: string | null
        } & DefaultSession["user"]
    }

    interface User {
        role: string
        villageId: string | null
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        role: string
        villageId: string | null
    }
}

declare module "@auth/core/adapters" {
    interface AdapterUser {
        role: string
        villageId: string | null
    }
}
