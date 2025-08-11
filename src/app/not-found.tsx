"use client";

import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="flex h-screen justify-center items-center">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" onClick={() => router.push("/")}>
                        Back Home
                    </Button>
                }
            />
        </div>
    );
}
