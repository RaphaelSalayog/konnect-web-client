"use client";

import TitlePage from "@/components/TitlePage";
import CheckoutList from "./CheckoutList";
import ItemList from "./ItemList";

const PointOfSale = () => {
    return (
        <TitlePage title="Point of Sale">
            <div className="h-[80vh] grid [grid-template-columns:3fr_1fr] gap-4">
                <ItemList />
                <CheckoutList />
            </div>
        </TitlePage>
    );
};

export default PointOfSale;
