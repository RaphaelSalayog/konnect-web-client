"use client";

import TitlePage from "@/components/TitlePage";
import { Button, InputNumber } from "antd";
import Image from "next/image";

const PointOfSale = () => {
    return (
        <TitlePage title="Point of Sale">
            <div className="flex flex-col min-h-[80vh]">
                <div className="w-[75%]">
                    <div className="grid grid-cols-3 gap-4">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="h-50 shadow-md border border-gray-100 rounded-lg p-4!"
                            >
                                <div className="grid [grid-template-columns:1fr_2fr] [grid-template-rows:3fr_auto] gap-2 h-full">
                                    <div className="relative w-full h-full rounded-md overflow-hidden">
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
                                            <div className="text-end text-green-800 font-semibold">
                                                P 1,000.00
                                            </div>
                                        </div>
                                        <div className="grow multi-line-truncate">
                                            Description Description Description Description
                                            Description Description Description Description
                                            Description Description Description Description
                                            Description Description Description Description
                                            Description Description Description Description
                                            Description Description
                                        </div>
                                        <div>Stocks : 80</div>
                                    </div>
                                    <InputNumber
                                        min={1}
                                        max={10}
                                        defaultValue={3}
                                        onChange={() => {}}
                                    />
                                    <div className="flex justify-end">
                                        <Button type="primary">Add</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-[25%] p-6"></div>
            </div>
        </TitlePage>
    );
};

export default PointOfSale;
