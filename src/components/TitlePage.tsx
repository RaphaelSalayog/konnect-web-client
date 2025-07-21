import { Typography } from "antd";
import { ReactNode } from "react";

const { Title } = Typography;

const TitlePage = ({ title, children }: { title: string; children?: ReactNode }) => {
    return (
        <div>
            <Title level={3} style={{ marginBottom: 24 }}>
                {title}
            </Title>
            <div>{children}</div>
        </div>
    );
};

export default TitlePage;
