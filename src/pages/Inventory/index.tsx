"use client";

import { getAllInventory } from "@/app/api/inventory-service";
import CustomActionButtons from "@/components/CustomActionButtons";
import TitlePage from "@/components/TitlePage";
import useTable from "@/hooks/useTable";
import { DrawerContext } from "@/store/context/DrawerVisibilityContext";
import { IAttachment } from "@/types/attachment";
import { CheckCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, message, Modal, Table, TableProps, Tag, Tooltip } from "antd";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import EmployeeFormDrawer from "./FormDrawer";

const { Search } = Input;

interface DataType {
    id: number;
    name: string;
    description: string;
    quantity: number;
    unit_cost: number;
    price: number;
    category: string;
    attachments: IAttachment[];
}

const Inventory = () => {
    const { data: session } = useSession();
    const [modal, contextHolderModal] = Modal.useModal();
    const [messageApi, contextHolderMessage] = message.useMessage();
    const { add, edit, view, id } = useContext(DrawerContext);
    const { dataSet, setData, loading, setLoading, search, setSearch, pagination, setPagination } =
        useTable();

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "Photo",
            dataIndex: "attachments",
            key: "attachments",
            render: (attachments) => (
                <Avatar.Group
                    size={50}
                    shape="square"
                    max={{
                        count: 2,
                        style: { color: "white", backgroundColor: "#1677ff" },
                    }}
                >
                    {attachments.map((attachment: any) => (
                        <Avatar
                            style={{ backgroundColor: "#1677ff" }}
                            src={attachment.presignedUrl}
                        />
                    ))}
                </Avatar.Group>
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
                        modal.confirm({
                            title: "Confirm Deletion",
                            content: (
                                <>
                                    <p>Are you sure you want to delete this item?</p>
                                    <p>This action cannot be undone.</p>
                                </>
                            ),
                            onOk: () => {
                                messageApi.open({
                                    type: "success",
                                    icon: <CheckCircleFilled className="!text-red-500" />,
                                    content: "Item was deleted successfully!",
                                });
                            },
                            okText: "DELETE",
                            okType: "danger",
                        });
                    }}
                />
            ),
        },
    ];

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                if (session?.token) {
                    const resp = await getAllInventory({
                        payload: {
                            search: search,
                            pagination: {
                                page: pagination.current,
                                limit: pagination.pageSize,
                            },
                        },
                        token: session?.token,
                    });

                    if (resp.ok) {
                        setData(resp.data.lists);
                        setPagination((prev) => ({ ...prev, total: resp.data.total }));
                    }
                }
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [session?.token, pagination.current, pagination.pageSize, search]);

    const handleTableChange: TableProps<DataType>["onChange"] = (pagination) => {
        setPagination((prev) => ({ ...prev, ...pagination }));

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== pagination.pageSize) {
            setData([]);
        }
    };

    return (
        <>
            {contextHolderModal}
            {contextHolderMessage}
            <TitlePage title="Inventory">
                <div className="!space-y-6">
                    <div className="flex !justify-end gap-4">
                        <Search
                            placeholder="Name"
                            className="w-100!"
                            allowClear
                            enterButton
                            onSearch={(e) => setSearch(e)}
                        />
                        <Button
                            type="primary"
                            size="middle"
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
                        scroll={{ x: "max-content" }} //y: 554
                        columns={columns}
                        dataSource={dataSet}
                        loading={loading}
                        pagination={pagination}
                        onChange={handleTableChange}
                        rowKey={(record) => record.id}
                    />
                </div>
            </TitlePage>
            <EmployeeFormDrawer reload={() => {}} />
        </>
    );
};

export default Inventory;
