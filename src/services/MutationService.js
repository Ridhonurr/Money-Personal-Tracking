import { IDT } from "indonesia-datetime";
import { api } from "./api";

export async function GetMutation({
    start = IDT.now().toFormat("yyyy-MM-dd"),
    end = IDT.now().toFormat("yyyy-MM-dd"),
    limit = 10,
    page = 1
}) {
    const params = new URLSearchParams({
        start,
        end,
        limit,
        page
    });

    const response = await api(
        `/mutation?${params.toString()}`,
        {
            method: "GET"
        }
    );

    return response.json();
}

export async function AddMutation({
    wallet_id,
    type = 0,
    nominal = 0,
    description = "-",
    category_id = "-",
    category_name = "-",
    is_new = false
}){
    const body = {
        wallet_id,
        type,
        nominal,
        description,
        category: {
            id: category_id,
            name: category_name,
            is_new
        }
    }

    const response = await api("/mutation/add", {
        method: "POST",
        body: JSON.stringify(body)
    });
    return response.json();
}

export async function GetCategory(){
    const response = await api("/mutation/category", {method: "GET"});
    return response.json();
}

export async function GetLastMutation(){
    const response = await api("/mutation/last", {method: "GET"});
    return response.json();
}