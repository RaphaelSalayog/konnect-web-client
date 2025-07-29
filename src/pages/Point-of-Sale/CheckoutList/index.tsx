import { Button, Typography } from "antd";

const { Title } = Typography;

const CheckoutList = () => {
    return (
        <div className="h-full min-h-0 grid [grid-template-rows:auto_1fr_auto] gap-y-4 !p-6 border border-zinc-100 rounded-lg">
            <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Current Transaction</p>
                <Button>Clear</Button>
            </div>
            <div className="overflow-y-auto">
                <ul className="grid grid-rows-3 gap-4">
                    {[...Array(1)].map((_, i) => (
                        <li key={i}>ITEMS</li>
                    ))}
                </ul>
            </div>

            <div className="!space-y-4">
                <div className="flex justify-between">
                    <p className="text-lg">Total</p>
                    <p className="text-lg">P 100,000.00</p>
                </div>
                <Button type="primary" style={{ width: "100%" }}>
                    Confirm Transaction
                </Button>
            </div>
        </div>
    );
};

export default CheckoutList;
