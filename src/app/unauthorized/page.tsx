"use client";

import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
    const router = useRouter();
    return (
        <div className="flex h-screen justify-center items-center">
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Button type="primary" onClick={() => router.push("/home")}>
                        Back Home
                    </Button>
                }
            />
        </div>
    );
};

export default UnauthorizedPage;
