import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import { createContext, useContext } from "react";

type DatabaseType = ExpoSQLiteDatabase<Record<string, never>> & {
    $client: SQLiteDatabase;
};

export const DatabaseContext = createContext<DatabaseType | null>(null);

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context)
        throw new Error("useDb must be used within an AuthContextProvider");
    return context;
};
