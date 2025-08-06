import { Button, Card, InputNumber, Tag, Tooltip } from "antd";
import Image from "next/image";

interface IPosItemCard {
    url: string;
    title: string;
    description: string;
    category: string;
    stocks: number;
    price: number;
}

const PosItemCard = ({ url, title, description, category, stocks, price }: IPosItemCard) => {
    return (
        <Card style={{ height: "auto" }}>
            <div className="grid [grid-template-columns:1fr_2fr] [grid-template-rows:3fr_auto] gap-2">
                <div className="relative w-full rounded-md overflow-hidden">
                    <Image src={url} alt={title} fill className="object-cover" />
                </div>
                <div className="grid [grid-template-rows:1fr_3fr_1fr_1fr] gap-y-1">
                    <div className="grid [grid-template-columns:2fr_1fr]">
                        <Tooltip placement="topLeft" title={title}>
                            <p className="font-semibold multi-line-truncate line-clamp-1">
                                {title}
                            </p>
                        </Tooltip>
                        <p className="text-end text-green-800 font-semibold whitespace-nowrap">
                            ₱ {price}
                        </p>
                    </div>
                    <Tooltip placement="topLeft" title={description}>
                        <p className="grow multi-line-truncate line-clamp-3">{description}</p>
                    </Tooltip>
                    <span>
                        <Tag color="blue">{category}</Tag>
                    </span>
                    <div>Stocks : {stocks}</div>
                </div>
                <InputNumber min={1} max={10} defaultValue={1} onChange={() => {}} />
                <div className="flex justify-end">
                    <Button type="primary">Add</Button>
                </div>
            </div>
        </Card>
    );
};

export default PosItemCard;
