"use client";

// import { createEmployee, getEmployeeById, updateEmployee } from "@/api/employee";
// import { STORAGE_NAME } from "@/constants/constants";
import { DrawerContext } from "@/store/context/DrawerVisibilityContext";
import { PlusOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
// import { createClient } from "@supabase/supabase-js";
import {
    Button,
    Drawer,
    Form,
    FormProps,
    Input,
    InputNumber,
    message,
    Modal,
    Space,
    Upload,
    UploadFile,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { useCallback, useContext, useState } from "react";

interface IProjectFormDrawer {
    reload: () => void;
}

interface FieldType {
    country: string;
    account_type: string;
    username: string;
    last_name: string;
    first_name: string;
    email: string;
    contact_number: string;
    photo: any;
}

const dateTimeId = moment().format("YYYYMMDD_HHmmss_SSS");

const EmployeeFormDrawer: React.FC<IProjectFormDrawer> = ({ reload }) => {
    const [modal, contextHolderModal] = Modal.useModal();
    const [messageApi, contextHolderMessage] = message.useMessage();
    const [form] = Form.useForm();
    const { view, add, edit, id } = useContext(DrawerContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onClose = useCallback(() => {
        view.setVisible(false);
        add.setVisible(false);
        edit.setVisible(false);
    }, []);

    // const supabase = createClient(
    //     process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    //     process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
    // );

    // useEffect(() => {
    //     const func = async () => {
    //         if (id.value && edit.visible) {
    //             setIsLoading(true);
    //             try {
    //                 const resp = await getEmployeeById({ id: id.value });
    //                 const data = resp.data.data;
    //                 form.setFieldsValue(data);
    //                 setFileList([
    //                     {
    //                         uid: "0",
    //                         name: data.photo.name,
    //                         status: "done",
    //                         url: data.photo.url,
    //                         thumbUrl: data.photo.url,
    //                     },
    //                 ]);
    //             } catch (error) {
    //             } finally {
    //                 setIsLoading(false);
    //             }
    //         }
    //     };
    //     func();
    // }, [id.value, edit.visible]);

    const onClickSubmit = useCallback(() => {
        form.submit();
    }, [form]);

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
            setFileList([]);
            onClose();
        }
    }, [form, modal, onClose]);

    const onFinish: FormProps<FieldType>["onFinish"] = useCallback(async (values: FieldType) => {
        console.log("values >> ", values);
    }, []);

    const handleChange = ({ fileList }: any) => {
        setFileList(fileList);
        if (fileList.length === 0) {
            form.setFieldsValue({ photo: null });
        } else {
            form.setFieldsValue({ photo: fileList[0] });
        }
    };

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
                        <TextArea autoSize={{ minRows: 3, maxRows: 5 }} readOnly={view.visible} />
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: "Quantity is required" }]}
                    >
                        <Input allowClear readOnly={view.visible} />
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
                        name="photo"
                        rules={[{ required: true, message: "Photo is required" }]}
                    >
                        <Upload
                            listType="picture"
                            // defaultFileList={fileList}
                            beforeUpload={() => false}
                            onChange={handleChange}
                            maxCount={1}
                            style={{ width: "100%" }}
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

export default EmployeeFormDrawer;
