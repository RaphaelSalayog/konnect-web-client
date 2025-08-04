import CustomModal from "@/components/CustomModal";
import { DrawerContext } from "@/store/context/DrawerVisibilityContext";
import { CheckCircleFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, message, Modal } from "antd";
import React, { useContext } from "react";

const ItemModal: React.FC = () => {
    const [modal, contextHolderModal] = Modal.useModal();
    const [messageApi, contextHolderMessage] = message.useMessage();
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
                <div className="!space-y-6"></div>
            </CustomModal>
        </>
    );
};

export default ItemModal;
