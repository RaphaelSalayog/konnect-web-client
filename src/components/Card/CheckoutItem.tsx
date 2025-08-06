import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, InputNumber, Tag, Tooltip } from "antd";
import Image from "next/image";

interface ICheckoutItemCard {
    url: string;
    title: string;
    description: string;
    category: string;
    quantity: number;
    price: number;
}

const CheckoutItemCard = ({
    url,
    title,
    description,
    category,
    quantity,
    price,
}: ICheckoutItemCard) => {
    return (
        <Card style={{ height: "auto" }}>
            <div className="grid [grid-template-columns:1fr_2fr] [grid-template-rows:3fr_auto] gap-2">
                <div className="relative w-full rounded-md overflow-hidden">
                    <Image src={url} alt={title} fill className="object-cover" />
                </div>
                <div className="grid [grid-template-rows:1fr_2fr_1fr] gap-y-1">
                    <div className="grid [grid-template-columns:2fr_1fr]">
                        <Tooltip placement="topLeft" title={title}>
                            <p className="font-semibold multi-line-truncate line-clamp-1">
                                {title}
                            </p>
                        </Tooltip>
                        <div className="flex justify-end">
                            <Button type="default" size="small" icon={<CloseOutlined />} />
                        </div>
                    </div>
                    <Tooltip placement="topLeft" title="grow multi-line-truncate">
                        <p className="grow multi-line-truncate line-clamp-2">{description}</p>
                    </Tooltip>
                    <span>
                        <Tag color="blue">{category}</Tag>
                    </span>
                </div>
                <InputNumber min={1} max={10} defaultValue={quantity} onChange={() => {}} />
                <div className="flex justify-end items-center">
                    <p className="text-end text-green-800 font-semibold whitespace-nowrap">
                        ₱ {price}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default CheckoutItemCard;
