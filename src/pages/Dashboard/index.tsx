"use client";

import TitlePage from "@/components/TitlePage";
import { useSession } from "next-auth/react";

const Dashboard = () => {
    const { data: session, status } = useSession();
    console.log(session, " ", status);

    return <TitlePage title="Dashboard">Dashboard</TitlePage>;
};

export default Dashboard;
