import { createContext, useContext } from "react";
import { User } from "@/types/modelTypes";

interface UserContextTypes {
    user: User;
}
export const UserContext = createContext<UserContextTypes>(
    {} as UserContextTypes
);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};
