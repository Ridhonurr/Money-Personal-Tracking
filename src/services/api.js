import { GetData, DeleteData } from "../helper/StorageData";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const SESSION_KEY = "session_id";

// Fungsi untuk redirect ke login — akan di-set dari luar
let onSessionExpired = null;

export function setOnSessionExpired(callback) {
    onSessionExpired = callback;
}

export async function api(path, options = {}) {
    // Ambil session_id dari storage
    const sessionData = await GetData(SESSION_KEY);
    const sessionId = sessionData?.value || null;

    const headers = {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
    };

    // Kirim session_id di header jika ada
    if (sessionId) {
        headers["X-Session-Id"] = sessionId;
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            ...headers,
            ...options.headers
        }
    });

    // Handle session invalid / expired
    if (response.status === 401) {
        // Hapus session_id dari storage
        await DeleteData(SESSION_KEY);

        // Redirect ke login
        if (onSessionExpired) {
            onSessionExpired();
        }

        throw new Error("Sesi tidak valid atau telah kedaluwarsa");
    }

    return response;
}
