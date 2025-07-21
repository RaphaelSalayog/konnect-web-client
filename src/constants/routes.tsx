import { DashboardOutlined, FolderOutlined, LaptopOutlined } from "@ant-design/icons";

export const routes = [
    {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: "Dashboard",
        route: "/dashboard",
    },
    {
        key: "inventory",
        icon: <FolderOutlined />,
        label: "Inventory",
        route: "/inventory",
    },
    {
        key: "point-of-sale",
        icon: <LaptopOutlined />,
        label: "Point of Sale",
        route: "/point-of-sale",
    },
    {
        key: "order",
        icon: <FolderOutlined />,
        label: "Order",
        route: "/order",
    },
];
