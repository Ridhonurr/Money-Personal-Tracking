import { api } from "./api";
import { StoreData } from "../helper/StorageData";

const SESSION_KEY = "session_id";

export async function login(email, password) {
    const response = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });

    return response.json();
}

export async function register(name, email, password) {
    const response = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password })
    });

    return response.json();
}

export async function verifyOtp(tokenId, otp, usecase) {
    const response = await api("/auth/verify", {
        method: "POST",
        body: JSON.stringify({ token_id: tokenId, otp, usecase })
    });

    const data = await response.json();

    // Simpan session_id ke storage jika berhasil
    if (data.session_id) {
        await StoreData(SESSION_KEY, data.session_id);
    }

    return data;
}
