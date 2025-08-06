import ItemCard from "@/components/ItemCard";
import { Input, Pagination } from "antd";

const { Search } = Input;

const items = [
    {
        url: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FSeries%2F2023-11-how-to-make-kimchi%2Fhow-to-make-kimchi-259",
        title: "Wireless Bluetooth Headphones",
        description:
            "Comfortable over-ear headphones with noise cancellation and 20-hour battery life.",
        stocks: 2,
        price: 89.99,
        category: "Electronics",
    },
    {
        url: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FSeries%2F2023-11-how-to-make-kimchi%2Fhow-to-make-kimchi-259",
        title: "Smart LED Desk Lamp",
        description:
            "Adjustable brightness and color temperature, touch control, USB charging port.",
        stocks: 1,
        price: 45.5,
        category: "Home & Living",
    },
    {
        url: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FSeries%2F2023-11-how-to-make-kimchi%2Fhow-to-make-kimchi-259",
        title: "Ergonomic Office Chair",
        description: "Mesh back, lumbar support, adjustable height and armrests.",
        stocks: 3,
        price: 149.99,
        category: "Furniture",
    },
    {
        url: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FSeries%2F2023-11-how-to-make-kimchi%2Fhow-to-make-kimchi-259",
        title: "Portable External SSD 1TB",
        description: "High-speed USB-C external solid state drive, compact and durable.",
        stocks: 1,
        price: 129.0,
        category: "Storage Devices",
    },
    {
        url: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FSeries%2F2023-11-how-to-make-kimchi%2Fhow-to-make-kimchi-259",
        title: "Wireless Charging Pad",
        description: "Fast charging pad for iPhone, Android, and other Qi-enabled devices.",
        stocks: 5,
        price: 19.99,
        category: "Mobile Accessories",
    },
];

const ItemList = () => {
    return (
        <div className="h-full min-h-0 grid [grid-template-rows:auto_1fr_auto] gap-y-4 !p-6 border border-zinc-100 rounded-lg">
            <div className="flex !justify-end">
                <Search placeholder="Name" className="w-100!" allowClear enterButton />
            </div>
            <div className="overflow-y-auto">
                <ul className="grid grid-cols-3 gap-4">
                    {items.map((item, i) => (
                        <li key={i}>
                            <ItemCard {...item} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex !justify-end">
                <Pagination defaultCurrent={6} total={500} />
            </div>
        </div>
    );
};
export default ItemList;
