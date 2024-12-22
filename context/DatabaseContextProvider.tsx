import { DatabaseContext } from "./DatabaseContext";
import * as SQLite from "expo-sqlite";
import { ReactNode, useEffect, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { getUserById, createUser } from "@/db/controller/userController";
import { User } from "@/types/modelTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
const databaseName = "db_test6.db";

const expo = SQLite.openDatabaseSync(databaseName, {
    enableChangeListener: true,
});

const DatabaseContextProvider = ({ children }: { children: ReactNode }) => {
    const db = drizzle(expo);
    const { success, error } = useMigrations(db, migrations);

    if (error) {
        return <DatabaseCreationError />;
    }

    console.log("success", success);
    // We set a default user at the start, then check if userTable is empty, if so, we create a new user
    const defaultUser: User = { id: 1, name: "default_user" };
    const [user, setUser] = useState<User>(defaultUser);

    // successful migration required to open the db viewer
    useDrizzleStudio(expo);

    useEffect(() => {
        if (!success) {
            console.log("error", error);
            return;
        }
        // ToDo: if no user is found, redirect to a register page to create a profile
        // ToDo: maybe create a app context provider for user data
        (async () => {
            const users = await getUserById(db, 1);

            if (users && users.length > 0) {
                setUser(users[0]);
            } else {
                await createUser(db, defaultUser);
            }
        })();

        // access error on closing?
        return () => {
            expo?.closeSync();
            expo && console.log("db closed");
        };
    }, [success, error]);

    console.log("user", user);

    return (
        <DatabaseContext.Provider value={{ db, user }}>
            {children}
        </DatabaseContext.Provider>
    );
};

export default DatabaseContextProvider;

const DatabaseCreationError = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <Text>
                Error creating the Database on your device. Running Journal is
                based on a local SQLite database, please make sure Running
                Journals has the permissions to create a database on your
                device.
            </Text>
        </SafeAreaView>
    );
};
