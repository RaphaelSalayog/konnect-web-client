import axiosHelper from "@/util/axiosHelper";

const url = process.env.NEXT_PUBLIC_API_URL;

interface IGetAllInventoryApi {
    payload?: {
        search?: string;
        pagination?: { page: number; limit: number };
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
