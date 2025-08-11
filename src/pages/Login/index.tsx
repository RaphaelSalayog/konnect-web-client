"use client";

import GoogleButton from "@/components/Button/GoogleButton";
import { carouselContent } from "@/constants/carousel";
import { Button, Carousel, Divider, Form, FormProps, Input, Layout, Row, Typography } from "antd";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const { Title, Text } = Typography;

const { Sider, Content } = Layout;

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Login = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish: FormProps<FieldType>["onFinish"] = useCallback(async (values: any) => {
        setIsLoading(true);
        const { username, password } = values;
        try {
            const resp = await signIn("credentials", {
                redirect: false,
                username,
                password,
            });

            if (resp?.ok) {
                router.push("/dashboard");
            } else {
                if (resp?.error === "Username does not exist!") {
                    form.setFields([
                        {
                            name: "username",
                            errors: [resp.error],
                        },
                    ]);
                } else if (resp?.error === "Invalid credentials!") {
                    form.setFields([
                        {
                            name: "password",
                            errors: [resp.error],
                        },
                    ]);
                }
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider width="50%" style={{ backgroundColor: "#003a8c" }}>
                <Carousel autoplay>
                    {carouselContent.map((item) => (
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
                <div className="w-[40%]">
                    <div className="!space-y-6">
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
                            form={form}
                            layout="vertical"
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                name="username"
                                rules={[{ required: true, message: "Please input your username!" }]}
                            >
                                <Input placeholder="Username" />
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
                    <Divider>
                        <span className="text-sm text-zinc-400">or</span>
                    </Divider>
                    <GoogleButton onClick={() => signIn("google")} />
                </div>
            </Content>
        </Layout>
    );
};

export default Login;
