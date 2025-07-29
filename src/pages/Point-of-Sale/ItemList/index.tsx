import ItemCard from "@/components/ItemCard";
import { Input, Pagination } from "antd";

const { Search } = Input;

const ItemList = () => {
    return (
        <div className="h-full min-h-0 grid [grid-template-rows:auto_1fr_auto] gap-y-4 !p-6 border border-zinc-100 rounded-lg">
            <div className="flex !justify-end">
                <Search placeholder="Name" className="w-100!" allowClear enterButton />
            </div>
            <div className="overflow-y-auto">
                <ul className="grid grid-cols-3 gap-4">
                    {[...Array(1)].map((_, i) => (
                        <li key={i}>
                            <ItemCard />
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
