import { createContext, useContext } from "react";
import { DatabaseType } from "@/types/dbType";
import { User } from "@/types/modelTypes";

interface DatabaseContextTypes {
    db: DatabaseType | null;
    user: User | null;
}

export const DatabaseContext = createContext<DatabaseContextTypes>({
    db: null,
    user: null,
});

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context)
        throw new Error("useDb must be used within an AuthContextProvider");
    return context;
};
