import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { postLogin } from "../local/auth";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const resp = await postLogin({
                    payload: {
                        username: credentials?.username,
                        password: credentials?.password,
                    },
                });

                if (!resp.ok) {
                    throw new Error(resp.message || "Login failed");
                }

                return resp.data;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login", // To prevent redirection to the /api/route/signin page of NextAuth when the user cancels the login process.
    },
    session: {
        strategy: "jwt", // so token is stored in JWT, not DB
    },
    callbacks: {
        async jwt({ token, user }) {
            // Runs when user signs in OR on every request
            if (user) {
                // `user` comes from `authorize` return value
                token.data = user as any; // attach your API response
            }
            return token;
        },
        async session({ session, token }) {
            // This is what `useSession()` sees
            if (token.data) {
                session.user = token.data.user;
                session.token = token.data.token;
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };
