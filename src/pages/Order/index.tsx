"use client";

import CustomActionButtons from "@/components/CustomActionButtons";
import TitlePage from "@/components/TitlePage";
import { DrawerContext } from "@/store/context/DrawerVisibilityContext";
import { Button, Input, Table, TableProps } from "antd";
import { useContext } from "react";
import ItemModal from "./ItemModal";

const { Search } = Input;

export interface DataType {
    key: string;
    order_id: string;
    name: string;
    payment_method: string;
    date: string;
}

const data: DataType[] = [
    {
        key: "1",
        order_id: "ORD-1001",
        name: "Alice Johnson",
        payment_method: "Credit Card",
        date: "2025-08-01",
    },
    {
        key: "2",
        order_id: "ORD-1002",
        name: "Bob Smith",
        payment_method: "PayPal",
        date: "2025-08-02",
    },
    {
        key: "3",
        order_id: "ORD-1003",
        name: "Charlie Brown",
        payment_method: "Bank Transfer",
        date: "2025-08-03",
    },
    {
        key: "4",
        order_id: "ORD-1004",
        name: "Diana Prince",
        payment_method: "Gcash",
        date: "2025-08-04",
    },
];

const Order = () => {
    const { view, id } = useContext(DrawerContext);

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "Order Id",
            dataIndex: "order_id",
            key: "order_id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Payment Method",
            dataIndex: "payment_method",
            key: "payment_method",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <CustomActionButtons actions={["view"]} handleView={() => view.setVisible(true)} />
            ),
        },
    ];

    return (
        <>
            <TitlePage title="Order">
                <div className="!space-y-6">
                    <div className="flex !justify-end gap-4">
                        <Search placeholder="Name" className="w-100!" allowClear enterButton />
                        <Button type="primary" size="middle">
                            Filter
                        </Button>
                    </div>
                    <Table<DataType>
                        tableLayout="auto"
                        scroll={{ x: "max-content" }}
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </TitlePage>
            <ItemModal />
        </>
    );
};

export default Order;
