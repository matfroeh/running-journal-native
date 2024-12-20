import { createContext, useContext } from "react";
import { DatabaseType } from "@/types/dbType";

export const DatabaseContext = createContext<DatabaseType | null>(null);

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context)
        throw new Error("useDb must be used within an AuthContextProvider");
    return context;
};
