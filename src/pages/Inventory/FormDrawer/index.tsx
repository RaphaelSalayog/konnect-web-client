"use client";

import { createInventory, getInventoryById, updateInventory } from "@/app/api/inventory-service";
import { BUCKET_NAME } from "@/constants/constants";
import { DrawerContext } from "@/store/context/DrawerVisibilityContext";
import { IAttachment } from "@/types/attachment";
import customFileName from "@/util/customFileName";
import { supabase } from "@/util/supabaseClient";
import { PlusOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Drawer,
    Form,
    FormProps,
    Input,
    InputNumber,
    message,
    Modal,
    Select,
    Space,
    Upload,
    UploadFile,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from "react";

interface IInventoryFormDrawer {
    reload: () => void;
}

interface FieldType {
    name: string;
    description: string;
    quantity: number;
    price: number;
    unit_cost: number;
    attachments: UploadFile[];
}

const InventoryFormDrawer: React.FC<IInventoryFormDrawer> = ({ reload }) => {
    const { data: session } = useSession();
    const [modal, contextHolderModal] = Modal.useModal();
    const [messageApi, contextHolderMessage] = message.useMessage();
    const [form] = Form.useForm();
    const { view, add, edit, id } = useContext(DrawerContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            if (id.value && (view.visible || edit.visible)) {
                setIsLoading(true);
                try {
                    const resp = await getInventoryById({
                        payload: { id: id.value },
                        token: session?.token,
                    });

                    if (!resp.ok) {
                        throw new Error();
                    }

                    const data = resp.data;
                    const attachments = resp.data.attachments.map((attachment: IAttachment) => ({
                        uid: attachment.id,
                        name: attachment.file_name,
                        status: "done",
                        url: attachment.presignedUrl,
                        file_path: attachment.file_path,
                    }));

                    form.setFieldsValue({
                        ...data,
                        attachments: attachments,
                    });
                } catch (error) {
                    messageApi.open({
                        type: "error",
                        content: "Something went wrong!",
                    });
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetch();
    }, [id.value, view.visible, edit.visible, session?.token]);

    const onClickSubmit = useCallback(() => {
        form.submit();
    }, [form]);

    const onFinish: FormProps<FieldType>["onFinish"] = useCallback(
        async (values: FieldType) => {
            setIsSubmitting(true);
            try {
                let uploadedAttachments: IAttachment[] = [];
                const fileList = values.attachments;

                if (fileList.length > 0) {
                    const attachments = await Promise.all(
                        fileList.map(async (file) => {
                            if (!file.originFileObj) {
                                return {
                                    id: file.uid,
                                    file_name: file.name,
                                    file_path: (file as any).file_path,
                                } as any;
                            }

                            const { data, error } = await supabase.storage
                                .from(BUCKET_NAME.inventory)
                                .upload(customFileName(file), (file as any).originFileObj, {
                                    cacheControl: "3600",
                                    upsert: true,
                                });

                            if (error) {
                                throw error;
                            }

                            console.log(`Uploaded ${file.name} to:`, data?.fullPath);
                            return {
                                file_name: file.name,
                                file_path: data?.fullPath,
                            };
                        })
                    );
                    uploadedAttachments = attachments;
                }

                if (add.visible) {
                    const resp = await createInventory({
                        payload: { ...values, attachments: uploadedAttachments },
                        token: session?.token,
                    });

                    if (resp.status === 201) {
                        messageApi.open({
                            type: "success",
                            content: "Item added successfully!",
                        });
                        reload();
                    } else {
                        messageApi.open({
                            type: "error",
                            content: "Failed to add item!",
                        });
                    }
                }

                if (edit.visible) {
                    const resp = await updateInventory({
                        payload: {
                            ...values,
                            id: id.value,
                            attachments: uploadedAttachments,
                        },
                        token: session?.token,
                    });

                    if (resp.status === 200) {
                        messageApi.open({
                            type: "success",
                            content: "Item update successfully!",
                        });
                        reload();
                    } else {
                        messageApi.open({
                            type: "error",
                            content: "Failed to update item!",
                        });
                    }

                    id.setValue(null);
                }
                // reload();
            } catch (error) {
                messageApi.open({
                    type: "error",
                    content: "Something went wrong!",
                });
            } finally {
                setIsSubmitting(false);
                // setFileList([]);
                onClose();
            }
        },
        [add.visible, edit.visible]
    );

    const onClose = useCallback(() => {
        view.setVisible(false);
        add.setVisible(false);
        edit.setVisible(false);
    }, []);

    const onCloseForm = useCallback(() => {
        if (form.isFieldsTouched()) {
            modal.confirm({
                title: "Confirm Discard",
                content: (
                    <>
                        <p>Are you sure you want to discard changes?</p>
                        <p>This action cannot be undone.</p>
                    </>
                ),
                onOk: () => {
                    onClose();
                },
                okText: "YES",
            });
        } else {
            // setFileList([]);
            onClose();
        }
    }, [form, modal, onClose]);

    const normFile = useCallback((e: any) => {
        console.log("Upload event:", e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    }, []);

    return (
        <>
            {contextHolderModal}
            {contextHolderMessage}
            <Drawer
                title={
                    add.visible
                        ? "Add Item"
                        : view.visible
                        ? "View Item"
                        : edit.visible
                        ? "Edit Item"
                        : ""
                }
                width={600}
                onClose={onCloseForm}
                open={add.visible || view.visible || edit.visible}
                extra={
                    <Space>
                        {(add.visible || edit.visible) && (
                            <Button
                                onClick={onClickSubmit}
                                type="primary"
                                icon={
                                    add.visible ? (
                                        <PlusOutlined />
                                    ) : edit.visible ? (
                                        <SaveOutlined />
                                    ) : (
                                        ""
                                    )
                                }
                                loading={isSubmitting}
                            >
                                {add.visible ? "Add" : edit.visible ? "Save" : ""}
                            </Button>
                        )}
                    </Space>
                }
                afterOpenChange={(open) => {
                    if (!open) {
                        form.resetFields();
                    }
                }}
                loading={isLoading}
            >
                <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Name is required" }]}
                    >
                        <Input allowClear readOnly={view.visible} />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Description is required" }]}
                    >
                        <TextArea
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            allowClear
                            readOnly={view.visible}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: "Category is required",
                            },
                        ]}
                    >
                        <Select
                            className="!w-full"
                            allowClear
                            options={[
                                { value: "beverages", label: "Beverages" },
                                { value: "meal", label: "Meal" },
                            ]}
                            placeholder="select category"
                            disabled={view.visible}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: "Quantity is required" }]}
                    >
                        <InputNumber readOnly={view.visible} />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-x-5.5">
                        <Form.Item
                            label="Unit Cost"
                            name="unit_cost"
                            rules={[{ required: true, message: "Unit Cost is required" }]}
                        >
                            <InputNumber<number>
                                precision={2}
                                formatter={(value) =>
                                    `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                                parser={(value) =>
                                    value?.replace(/₱\s?|(,*)/g, "") as unknown as number
                                }
                                readOnly={view.visible}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: "Price is required" }]}
                        >
                            <InputNumber<number>
                                precision={2}
                                formatter={(value) =>
                                    `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                                parser={(value) =>
                                    value?.replace(/₱\s?|(,*)/g, "") as unknown as number
                                }
                                readOnly={view.visible}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Photo"
                        name="attachments"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: "Photo is required" }]}
                    >
                        <Upload
                            fileList={form.getFieldValue("attachments") as any}
                            listType="picture"
                            beforeUpload={() => false}
                            maxCount={5}
                            multiple
                            style={{ width: "100%" }}
                            disabled={view.visible}
                        >
                            {(add.visible || edit.visible) && (
                                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                                    Upload
                                </Button>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default InventoryFormDrawer;
