import CustomModal from "@/components/CustomModal";
import { DrawerContext } from "@/store/context/DrawerVisibilityContext";
import { CheckCircleFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Table, TableProps, Tag, Tooltip } from "antd";
import Image from "next/image";
import React, { useContext } from "react";

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
    category: string;
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
        category: "Electronics",
    },
    {
        key: "2",
        photo: { url: "https://images.unsplash.com/photo-1606755962775-0e59c9d7f5e8" },
        name: "Spicy Radish Kimchi",
        description: "Cubed radish kimchi with extra‑hot gochugaru",
        quantity: 18,
        unit_cost: 2.1,
        price: 4.49,
        category: "Electronics",
    },
    {
        key: "3",
        photo: { url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061" },
        name: "Kimchi Pancake Mix",
        description: "Ready‑to‑cook 400 g batter mix",
        quantity: 60,
        unit_cost: 1.2,
        price: 2.99,
        category: "Electronics",
    },
    {
        key: "4",
        photo: { url: "https://images.unsplash.com/photo-1600986604128-8c42b81eecb3" },
        name: "Kimchi Dumplings",
        description: "Frozen 20‑piece pack, pork & kimchi filling",
        quantity: 40,
        unit_cost: 3.8,
        price: 7.49,
        category: "Electronics",
    },
    {
        key: "5",
        photo: { url: "https://images.unsplash.com/photo-1589301913259-d47db05c1d5a" },
        name: "Kimchi Ramen Bowl",
        description:
            "Instant noodles with dehydrated kimchi Instant noodles with dehydrated kimchi Instant noodles with dehydrated kimchi Instant noodles with dehydrated kimchi Instant noodles with dehydrated kimchi Instant noodles with dehydrated kimchi Instant noodles with dehydrated kimchi",
        quantity: 120,
        unit_cost: 0.95,
        price: 2.25,
        category: "Electronics",
    },
];

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
        onCell: () => ({
            style: {
                maxWidth: 200,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
        }),
        render: (name) => {
            return (
                <Tooltip placement="topLeft" title={name}>
                    <p className="multi-line-truncate line-clamp-1">{name}</p>
                </Tooltip>
            );
        },
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
        onCell: () => ({
            style: {
                maxWidth: 200,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
        }),
        render: (description) => {
            return (
                <Tooltip placement="topLeft" title={description}>
                    <p className="multi-line-truncate line-clamp-1">{description}</p>
                </Tooltip>
            );
        },
    },
    {
        title: "Category",
        dataIndex: "category",
        key: "category",
        render: (category) => {
            return (
                <span>
                    <Tag color="blue">{category}</Tag>
                </span>
            );
        },
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
];

const ItemModal: React.FC = () => {
    const [modal, contextHolderModal] = Modal.useModal();
    const [messageApi, contextHolderMessage] = message.useMessage();
    const [form] = Form.useForm();
    const { view, id } = useContext(DrawerContext);
    const [loading, setLoading] = React.useState<boolean>(false);

    const onCancel = () => {
        view.setVisible(false);
    };

    return (
        <>
            {contextHolderModal}
            {contextHolderMessage}
            <CustomModal
                open={view.visible}
                title="Item Id"
                width={1000}
                footer={[
                    <Button
                        key="reject"
                        color="red"
                        variant="solid"
                        icon={<CloseOutlined />}
                        onClick={() => {
                            modal.confirm({
                                title: "Confirm Rejection",
                                content: (
                                    <>
                                        <p>Are you sure you want to reject this item?</p>
                                        <p>This action cannot be undone.</p>
                                    </>
                                ),
                                onOk: () => {
                                    messageApi.open({
                                        type: "success",
                                        icon: <CheckCircleFilled className="!text-red-500" />,
                                        content: "Order Id was rejected!",
                                    });
                                    onCancel();
                                },
                                okText: "REJECT",
                                okType: "danger",
                            });
                        }}
                    >
                        Reject
                    </Button>,
                    <Button
                        key="approve"
                        color="green"
                        variant="solid"
                        icon={<CheckOutlined />}
                        onClick={() => {
                            modal.confirm({
                                title: "Confirm Approval",
                                content: (
                                    <>
                                        <p>Are you sure you want to accept this order?</p>
                                        <p>This action cannot be undone.</p>
                                    </>
                                ),
                                onOk: () => {
                                    messageApi.open({
                                        type: "success",
                                        content: "Order Id was accepted!",
                                    });
                                    onCancel();
                                },
                                okText: "ACCEPT",
                                okType: "primary",
                            });
                        }}
                    >
                        Accept
                    </Button>,
                ]}
                onClose={onCancel}
            >
                <Form form={form} layout="vertical" autoComplete="off">
                    <div className="grid !grid-cols-2 gap-x-6">
                        <Form.Item label="Order Id" name="order_id">
                            <Input readOnly={true} />
                        </Form.Item>

                        <Form.Item label="Name" name="name">
                            <Input readOnly={true} />
                        </Form.Item>

                        <Form.Item label="Date" name="date">
                            <Input readOnly={true} />
                        </Form.Item>

                        <Form.Item label="Payment Method" name="payment_method">
                            <Input readOnly={true} />
                        </Form.Item>
                    </div>

                    <Form.Item label="Items" name="items">
                        <Table<DataType>
                            tableLayout="auto"
                            scroll={{ x: "max-content" }}
                            columns={columns}
                            dataSource={data}
                        />
                    </Form.Item>
                </Form>
            </CustomModal>
        </>
    );
};

export default ItemModal;
