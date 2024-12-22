import { useEffect, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { getAllUsers, createUser } from "@/db/controller/userController";
import { NewUser, User } from "@/types/modelTypes";
import Storage from "expo-sqlite/kv-store";
import { SQLiteDatabase } from "expo-sqlite";

export const useDbInit = (expo: SQLiteDatabase) => {
    const db = drizzle(expo);
    const { success, error } = useMigrations(db, migrations);
    const defaultUser: User = { id: -1, name: "loading_user" }; // Initial placeholder
    const errorUser: User = { id: -2, name: "error_user" }; // Explicit error state
    const [user, setUser] = useState<User>(defaultUser);
    const [loading, setLoading] = useState(true);

    useDrizzleStudio(expo);

    useEffect(() => {
        if (!success) return;

        (async () => {
            try {
                const currentUser = await initializeUser();
                setUser(currentUser);
            } catch (err) {
                console.error("Error initializing user:", err);
                setUser(errorUser); // Explicit error state
            } finally {
                setLoading(false);
            }
        })();

        return () => {
            expo?.closeSync();
        };
    }, [success, db]);

    const initializeUser = async (): Promise<User> => {
        const userList = await getAllUsers(db);
        const lastUserId = await getLastUserId();

        if (userList.length > 0) {
            return lastUserId
                ? userList.find((user) => user.id === lastUserId) || userList[0]
                : userList[0];
        } else {
            return createNewUser({ name: "default_user" });
        }
    };

    const getLastUserId = async () => {
        const lastUserId: number | null = await Storage.getItem(
            "lastUserId"
        ).then((id) => (id ? parseInt(id) : null));
        return lastUserId;
    };

    const createNewUser = async (user: NewUser): Promise<User> => {
        const newUserId = await createUser(db, user);
        if (!newUserId) throw new Error("Error creating user");
        return { id: newUserId, ...user };
    };

    return { db, user, loading, error };
};
