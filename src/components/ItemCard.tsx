import { Button, Card, InputNumber, Tooltip } from "antd";
import Image from "next/image";

const ItemCard = () => {
    return (
        <Card style={{ height: "auto" }}>
            <div className="grid [grid-template-columns:1fr_2fr] [grid-template-rows:3fr_auto] gap-2">
                <div className="relative w-full rounded-md overflow-hidden">
                    <Image
                        src="https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FSeries%2F2023-11-how-to-make-kimchi%2Fhow-to-make-kimchi-259"
                        alt="Product"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div className="grid [grid-template-columns:2fr_1fr]">
                        <div className="font-semibold">Title</div>
                        <p className="text-end text-green-800 font-semibold whitespace-nowrap">
                            P 1,000.00
                        </p>
                    </div>
                    <Tooltip title="grow multi-line-truncate">
                        <p className="grow multi-line-truncate">
                            Description Description Description Description Description Description
                            Description Description Description Description Description Description
                            Description Description Description Description Description Description
                            Description Description Description Description
                        </p>
                    </Tooltip>
                    <div>Stocks : 80</div>
                </div>
                <InputNumber min={1} max={10} defaultValue={3} onChange={() => {}} />
                <div className="flex justify-end">
                    <Button type="primary">Add</Button>
                </div>
            </div>
        </Card>
    );
};

export default ItemCard;
