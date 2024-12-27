import { DatabaseContext } from "./DatabaseContext";
import * as SQLite from "expo-sqlite";
import { ReactNode } from "react";
import { DatabaseCreationError } from "@/components/error";
import { useDbInit } from "@/lib/hooks";
import { LoadingScreen } from "@/components/generic";

const databaseName = "db_test7.db";
const expo = SQLite.openDatabaseSync(databaseName, {
    enableChangeListener: true,
});

const DatabaseContextProvider = ({ children }: { children: ReactNode }) => {
    const { db, user, loading, error } = useDbInit(expo);

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        console.error("Database creation error:", error);
        return <DatabaseCreationError />;
    }
    // Explicit error state upon user creation failure
    if (user.id === -2) {
        return <DatabaseCreationError />;
    }

    return (
        <DatabaseContext.Provider value={{ db, user, loading }}>
            {children}
        </DatabaseContext.Provider>
    );
};

export default DatabaseContextProvider;
