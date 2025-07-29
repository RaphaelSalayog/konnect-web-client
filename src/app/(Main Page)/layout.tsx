"use client";

import { routes } from "@/constants/routes";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Header, Sider, Content } = Layout;

const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "sticky",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        if (pathname) {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return (
        <Layout className="!min-h-screen">
            <Sider style={siderStyle} trigger={null} collapsible collapsed={collapsed}>
                <div className="flex items-center justify-center gap-x-2 !p-4 !mb-2">
                    <Image
                        src={
                            "https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png"
                        }
                        width={40}
                        height={40}
                        alt="Logo"
                    />
                    <p className={`text-white text-xl ${collapsed ? "hidden" : "block"}`}>
                        Company
                    </p>
                </div>
                <Menu
                    className="!space-y-3"
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[pathname?.split("/")[1] || ""]}
                    items={routes.map(({ route, ...restData }) => ({
                        ...restData,
                        onClick: () => router.push(route),
                    }))}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        width: "100%",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="!px-6">
                        <p>salayog@gmail.com</p>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                    className="!space-y-6"
                >
                    {children}
                </Content>
                {/* <Footer style={{ textAlign: "center" }}>PhilCentro Technologies Inc.</Footer> */}
            </Layout>
        </Layout>
    );
}
