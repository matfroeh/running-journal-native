import { UserContext } from "./UserContext";
import { ReactNode } from "react";
import { getLiveUserById } from "@/db/controller";
import { useDatabase } from "./DatabaseContext";
import { LoadingScreen } from "@/components/generic";

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const { db, loading } = useDatabase();

    if (loading) {
        return <LoadingScreen />;
    }

    const id = 1;

    const { user } = getLiveUserById(db, id);

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
};
