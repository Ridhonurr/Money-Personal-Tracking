const API_URL =import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function api(path, options = {}){
    return fetch(`${API_URL}${path}`,{
        ...options,
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        }
    })
}