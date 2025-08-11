// src/types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            firstName: string;
            lastName: string;
            // Add other user fields here...
        } & DefaultSession["user"];
        token: string; // JWT from backend
    }

    interface User extends DefaultUser {
        token: string; // Backend JWT
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        data?: {
            user: {
                id: string;
                username: string;
                firstName: string;
                lastName: string;
                // Add other user fields here...
            };
            token: string;
        };
    }
}
