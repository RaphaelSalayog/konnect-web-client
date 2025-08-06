import CheckoutItemCard from "@/components/CheckoutItemCard";
import { Button } from "antd";

const items = [
    {
        url: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FSeries%2F2023-11-how-to-make-kimchi%2Fhow-to-make-kimchi-259",
        title: "Wireless Bluetooth Headphones",
        description:
            "Comfortable over-ear headphones with noise cancellation and 20-hour battery life.",
        quantity: 2,
        price: 89.99,
        category: "Electronics",
    },
    {
        url: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FSeries%2F2023-11-how-to-make-kimchi%2Fhow-to-make-kimchi-259",
        title: "Smart LED Desk Lamp",
        description:
            "Adjustable brightness and color temperature, touch control, USB charging port.",
        quantity: 1,
        price: 45.5,
        category: "Home & Living",
    },
    {
        url: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FSeries%2F2023-11-how-to-make-kimchi%2Fhow-to-make-kimchi-259",
        title: "Ergonomic Office Chair",
        description: "Mesh back, lumbar support, adjustable height and armrests.",
        quantity: 3,
        price: 149.99,
        category: "Furniture",
    },
    {
        url: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FSeries%2F2023-11-how-to-make-kimchi%2Fhow-to-make-kimchi-259",
        title: "Portable External SSD 1TB",
        description: "High-speed USB-C external solid state drive, compact and durable.",
        quantity: 1,
        price: 129.0,
        category: "Storage Devices",
    },
    {
        url: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FSeries%2F2023-11-how-to-make-kimchi%2Fhow-to-make-kimchi-259",
        title: "Wireless Charging Pad",
        description: "Fast charging pad for iPhone, Android, and other Qi-enabled devices.",
        quantity: 5,
        price: 19.99,
        category: "Mobile Accessories",
    },
];

const CheckoutList = () => {
    return (
        <div className="h-full min-h-0 grid [grid-template-rows:auto_1fr_auto] gap-y-4 !p-6 border border-zinc-100 rounded-lg">
            <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Current Transaction</p>
                <Button>Clear</Button>
            </div>
            <div className="overflow-y-auto">
                <ul className="grid grid-rows-3 gap-4">
                    {items.map((item, i) => (
                        <li key={i}>
                            <CheckoutItemCard {...item} />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="!space-y-4">
                <div className="flex justify-between">
                    <p className="text-lg">Total</p>
                    <p className="text-lg text-green-800 font-semibold">P 100,000.00</p>
                </div>
                <Button type="primary" style={{ width: "100%" }}>
                    Confirm Transaction
                </Button>
            </div>
        </div>
    );
};

export default CheckoutList;
