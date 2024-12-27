import { useEffect, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { getAllUsers, createUser } from "@/db/controller/userController";
import { NewUser, User } from "@/types/modelTypes";
import Storage from "expo-sqlite/kv-store";
import { SQLiteDatabase } from "expo-sqlite";
import Constants from "expo-constants";
import { getLastUserId } from "@/db/controller";

export const useDbInit = (expo: SQLiteDatabase) => {
    const db = drizzle(expo);
    const { success, error } = useMigrations(db, migrations);
    console.log("success", success);
    console.log("error", error);

    const loadingUserState: User = { id: -1, name: "loading_user" }; // Initial placeholder
    const errorUser: User = { id: -2, name: "error_user" }; // Explicit error state
    const [user, setUser] = useState<User>(loadingUserState);
    const [loading, setLoading] = useState(true);

    if (!Constants.expoConfig?.extra?.isTest) {
        useDrizzleStudio(expo); // Enable dev tools only outside of test environment
    }

    useEffect(() => {
        console.log("useDbInit effect");

        if (!success) return;

        (async () => {
            console.log("Initializing user");

            try {
                const currentUser = await initializeUser();
                console.log("currentUser", currentUser);

                setUser(currentUser);
            } catch (err) {
                console.error("Error initializing user:", err);
                setUser(errorUser); // Explicit error state
            } finally {
                setLoading(false);
            }
        })();

        return () => {
            console.log("Closing database connection");

            expo?.closeSync();
            console.log("Database connection closed");
        };
    }, [success === true]);

    const initializeUser = async (): Promise<User> => {
        const userList: User[] = (await getAllUsers(db)) || [];
        console.log("userList at initializeUser", userList);

        const lastUserId = await getLastUserId();

        if (userList.length > 0) {
            console.log("User list", userList);

            return lastUserId
                ? userList.find((user) => user.id === lastUserId) || userList[0]
                : userList[0];
        } else {
            console.log("No users found, creating default user");
            // const newUser = await createNewUser({ name: "default_user" });
            const newUserId = await createUser(db, { name: "default_user" });
            return { id: newUserId, name: "default_user" };
        }
    };

    return { db, user, loading, error };
};
