import { DatabaseContext } from "./DatabaseContext";
import * as SQLite from "expo-sqlite";
import { ReactNode, useEffect } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";

// Open the database connection
const expo = SQLite.openDatabaseSync("db_test4.db", {
    enableChangeListener: true,
});

const db = drizzle(expo);

const DatabaseContextProvider = ({ children }: { children: ReactNode }) => {
    const { success, error } = useMigrations(db, migrations);

    // successful migration required to open the db viewer
    useDrizzleStudio(expo);

    console.log("success", success);
    console.log("error", error);
    // console.log(expo);

    useEffect(() => {
        if (!success) return;

        return () => {
            expo.closeAsync();
        };
    }, [success]);

    // migrations, etc.

    return (
        <DatabaseContext.Provider value={db}>
            {children}
        </DatabaseContext.Provider>
    );
};

export default DatabaseContextProvider;
