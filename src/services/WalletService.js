import {api} from "./api";

export async function getWallets(id = null){
    if (id){
        const detail = await api(`/wallet/${id}`, { method: "GET" });
        return detail.json();
    }
    const response = await api("/wallet", {method: "GET"});
    return response.json();
}

export async function getWalletCards(){
    const response = await api("/wallet/card", {method: "GET"});
    return response.json();
}

export async function getTypeWallet(){
    const response = await api("/wallet/type", {method: "GET"});
    return response.json();
}

export async function addWallet({
    name,
    balance,
    description,
    type_wallet,
    is_new,
    is_showing
}){
    const body = {
        name,
        balance,
        description,
        additionalInfo: {
            type_wallet,
            is_new,
            is_showing
        }
    }
    const response = await api("/wallet/add", {
        method: "POST",
        body: JSON.stringify(body)
    });
    return response.json();
}

export async function updateWallet({
    id,
    name,
    description,
    type_wallet,
    is_new,
    is_showing
}){
    const body = {
        name,
        description,
        additionalInfo: {
            type_wallet,
            is_new,
            is_showing
        }
    }
    const response = await api(`/wallet/${id}`, {
        method: "PUT",
        body: JSON.stringify(body)
    });
    return response.json();
}

export async function deleteWallet(id){
    const response = await api(`/wallet/${id}`, {
        method: "DELETE"
    });
    return response.json();
}