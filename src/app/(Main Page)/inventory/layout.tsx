"use client";

import DrawerVisibilityContext from "@/store/context/DrawerVisibilityContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <DrawerVisibilityContext>{children}</DrawerVisibilityContext>;
}
