import Storage from "expo-sqlite/kv-store";

export const getLastUserId = async () => {
    try {
        const lastUserId = await Storage.getItem("lastUserId");
        console.log("lastUserId", lastUserId);

        return lastUserId ? parseInt(lastUserId) : null;
    } catch (err) {
        console.error("Error fetching lastUserId", err);
        throw new Error("Error fetching lastUserId");
    }
};
