import { CloseCircleFilled } from "@ant-design/icons";
import { Modal, Typography } from "antd";

interface ICustomModal {
    title?: string;
    width?: number;
    open?: boolean;
    afterClose?: () => void;
    onClose?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    centered?: boolean;
    onOk?: () => void;
    okText?: string;
    footer?: React.ReactNode[];
    children?: React.ReactNode;
}

const CustomModal: React.FC<ICustomModal> = ({
    title,
    width = 600,
    onOk,
    okText = "OK",
    open,
    onClose,
    afterClose,
    centered = false,
    footer,
    children,
}) => {
    return (
        <>
            <Modal
                width={width}
                open={open}
                onOk={onOk}
                okText={okText}
                closable
                afterClose={afterClose}
                onCancel={onClose}
                centered={centered}
                closeIcon={<CloseCircleFilled style={{ color: "rgba(0, 0, 0, 0.85)" }} />}
                footer={footer}
            >
                <div
                    style={{
                        marginTop: 15,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 10,
                    }}
                >
                    <Typography.Title level={4} style={{ marginBottom: 15 }}>
                        {title}
                    </Typography.Title>
                    <div
                        className="!pb-2.5 max-h-[70vh] overflow-auto"
                        style={{ marginBottom: footer && footer.length > 0 ? "22px" : "0px" }}
                    >
                        {children}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CustomModal;
