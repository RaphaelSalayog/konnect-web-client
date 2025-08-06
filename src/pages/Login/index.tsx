"use client";

import { Button, Carousel, Form, FormProps, Input, Layout, Row, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const { Title, Text } = Typography;

const { Sider, Content } = Layout;

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

const content = [
    {
        key: "1",
        image: "/images/organizing-projects.svg",
        title: "Improved Project Tracking and Accountability",
        description:
            "Provides real-time updates on project progress, timelines, and resource allocation.",
    },
    {
        key: "2",
        image: "/images/standup-meeting.svg",
        title: "Efficient Resource Management",
        description:
            "Helps optimize material, labor, and budget allocation to avoid delays and cost overruns.",
    },
    {
        key: "3",
        image: "/images/building-safety.svg",
        title: "Risk Identification and Mitigation",
        description:
            "Detects potential risks and delays early through automated alerts and reports.",
    },
    {
        key: "4",
        image: "/images/online-report.svg",
        title: "Data-Driven Decision Making",
        description:
            "Centralizes data for analysis and reporting to helps stakeholders make informed decisions based on accurate project metrics.",
    },
];

const Login = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish: FormProps<FieldType>["onFinish"] = useCallback((values: any) => {
        console.log("Success:", values);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            router.push("/home");
        }, 3000);
    }, []);

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = useCallback((errorInfo: any) => {
        console.log("Failed:", errorInfo);
    }, []);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider width="50%" style={{ backgroundColor: "#003a8c" }}>
                <Carousel autoplay>
                    {content.map((item) => (
                        <Row key={item.key}>
                            <div className="h-screen bg-[#003a8c] flex flex-col items-center justify-center">
                                <Image src={item.image} width={550} height={550} alt={item.title} />
                                <Title level={5} style={{ color: "white" }}>
                                    {item.title}
                                </Title>
                                <Text style={{ color: "white" }}>{item.description}</Text>
                            </div>
                        </Row>
                    ))}
                </Carousel>
            </Sider>
            <Content
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                }}
            >
                <div className="w-[40%] !space-y-6">
                    <div className="flex flex-col items-center justify-center !space-y-2">
                        <Title
                            level={3}
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                letterSpacing: "0.05rem",
                            }}
                        >
                            Konnect
                        </Title>
                        <Text type="secondary" style={{ textAlign: "center" }}>
                            An eCommerce and POS management system that seamlessly unifies your
                            online and in-store sales.
                        </Text>
                    </div>
                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            name="email"
                            rules={[{ required: true, message: "Please input your email!" }]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="password"
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                            loading={isLoading}
                        >
                            Login
                        </Button>
                    </Form>
                    <div className="text-sm flex justify-between">
                        <Link
                            href="/register-account"
                            className="text-blue-600 font-medium underline-offset-4 transition-all hover:underline hover:text-blue-700"
                        >
                            Register
                        </Link>
                        <Link
                            href="/register"
                            className="text-blue-600 font-medium underline-offset-4 transition-all hover:underline hover:text-blue-700"
                        >
                            Forgot Password
                        </Link>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default Login;
