"use client";

import CustomActionButtons from "@/components/CustomActionButtons";
import TitlePage from "@/components/TitlePage";
import { DrawerContext } from "@/store/context/DrawerVisibilityContext";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Table, TableProps } from "antd";
import Image from "next/image";
import { useContext } from "react";
import EmployeeFormDrawer from "./FormDrawer";

interface DataType {
    key: string;
    photo: {
        url: string;
    };
    name: string;
    description: string;
    quantity: number;
    unit_cost: number;
    price: number;
}

const data: DataType[] = [
    {
        key: "1",
        photo: { url: "https://images.unsplash.com/photo-1514996937319-344454492b37" },
        name: "Kimchi Classic",
        description: "Traditional napa cabbage kimchi (500 g jar)",
        quantity: 25,
        unit_cost: 2.5,
        price: 4.99,
    },
    {
        key: "2",
        photo: { url: "https://images.unsplash.com/photo-1606755962775-0e59c9d7f5e8" },
        name: "Spicy Radish Kimchi",
        description: "Cubed radish kimchi with extra‑hot gochugaru",
        quantity: 18,
        unit_cost: 2.1,
        price: 4.49,
    },
    {
        key: "3",
        photo: { url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061" },
        name: "Kimchi Pancake Mix",
        description: "Ready‑to‑cook 400 g batter mix",
        quantity: 60,
        unit_cost: 1.2,
        price: 2.99,
    },
    {
        key: "4",
        photo: { url: "https://images.unsplash.com/photo-1600986604128-8c42b81eecb3" },
        name: "Kimchi Dumplings",
        description: "Frozen 20‑piece pack, pork & kimchi filling",
        quantity: 40,
        unit_cost: 3.8,
        price: 7.49,
    },
    {
        key: "5",
        photo: { url: "https://images.unsplash.com/photo-1589301913259-d47db05c1d5a" },
        name: "Kimchi Ramen Bowl",
        description: "Instant noodles with dehydrated kimchi",
        quantity: 120,
        unit_cost: 0.95,
        price: 2.25,
    },
];

const Inventory = () => {
    const { add, edit, view, id } = useContext(DrawerContext);

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "Photo",
            dataIndex: "photo",
            key: "photo",
            render: (photo, record) => (
                <div className="relative w-20 h-20 rounded-sm overflow-hidden">
                    {/* {photo?.url && (
                    <Image src={photo.url} alt={record.first_name} fill className="object-cover" />
                )} */}
                    <Image
                        src={
                            "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FSeries%2F2023-11-how-to-make-kimchi%2Fhow-to-make-kimchi-259"
                        }
                        alt={"Product"}
                        fill
                        className="object-cover"
                    />
                </div>
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Unit Cost",
            dataIndex: "unit_cost",
            key: "unit_cost",
            render: (unit_cost) => <p>₱ {unit_cost}</p>,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (unit_cost) => <p>₱ {unit_cost}</p>,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <CustomActionButtons
                    actions={["view", "edit", "delete"]}
                    handleView={() => {
                        view.setVisible(true);
                    }}
                    handleEdit={() => {
                        edit.setVisible(true);
                        // id.setValue(record.id);
                    }}
                    handleDelete={() => {
                        // modal.confirm({
                        //     title: "Confirm Discard",
                        //     content: (
                        //         <>
                        //             <p>
                        //                 Are you sure you want to delete{" "}
                        //                 <span className="font-semibold">{record.username}</span>?
                        //             </p>
                        //             <p>This action cannot be undone.</p>
                        //         </>
                        //     ),
                        //     onOk: async () => {
                        //         try {
                        //             const resp = await deleteEmployee({ id: record.id });
                        //             if (resp.status === 200) {
                        //                 setReload((prev) => !prev);
                        //                 messageApi.open({
                        //                     type: "success",
                        //                     content: "Employee delete successfully!",
                        //                 });
                        //             }
                        //         } catch (error) {}
                        //     },
                        //     okText: "YES",
                        // });
                    }}
                />
            ),
        },
    ];

    return (
        <>
            <TitlePage title="Inventory">
                <div className="!space-y-6">
                    <div className="flex !justify-end">
                        <Button
                            type="primary"
                            size="large"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                add.setVisible(true);
                            }}
                        >
                            Add Item
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
            <EmployeeFormDrawer reload={() => {}} />
        </>
    );
};

export default Inventory;
