import { IAttachment } from "@/types/attachment";
import axiosHelper from "@/util/axiosHelper";

const url = process.env.NEXT_PUBLIC_API_URL;

interface IGetAllInventoryApi {
    payload?: {
        search?: string;
        pagination?: { page?: number; limit?: number };
    };
    token: string | undefined;
}

interface ICreateInventoryApi {
    payload: {
        name: string;
        description: string;
        quantity: number;
        price: number;
        unit_cost: number;
        attachments: IAttachment[];
    };
    token: string | undefined;
}

export const getAllInventory = async ({ payload, token }: IGetAllInventoryApi) => {
    return await axiosHelper({
        url: url,
        pathname: "/inventory/getAllInventory",
        method: "POST",
        payload,
        token,
    });
};

export const createInventory = async ({ payload, token }: ICreateInventoryApi) => {
    return await axiosHelper({
        url: url,
        pathname: "/inventory/createInventory",
        method: "POST",
        payload,
        token,
    });
};
