"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;

        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            router.push("/dashboard");
        }
    }, [status, router]);

    return null;
}
