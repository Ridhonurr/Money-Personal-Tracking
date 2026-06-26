import { Preferences } from "@capacitor/preferences";

export const StoreData = async (key, value) => {
    await Preferences.set({key: key, value: value});
}

export const GetData = async (key) => {
    return await Preferences.get({key: key});
}

export const DeleteData = async (key) => {
    await Preferences.remove({key: key});
}