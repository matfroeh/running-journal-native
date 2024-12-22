import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { getAllUsers, createUser } from "@/db/controller/userController";
import { User } from "@/types/modelTypes";
import { useDatabase } from "./DatabaseContext";
import Storage from "expo-sqlite/kv-store";

const UserContext = createContext(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const { db } = useDatabase();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const userList = await getAllUsers(db);
                const lastUserId = await getLastUserId();

                if (userList.length > 0) {
                    const currentUser = lastUserId
                        ? userList.find((u) => u.id === lastUserId) ||
                          userList[0]
                        : userList[0];
                    setUser(currentUser);
                } else {
                    const newUserId = await createUser(db, {
                        name: "default_user",
                    });
                    setUser({ id: newUserId, name: "default_user" });
                }
            } catch (err) {
                console.error("Error initializing user:", err);
            } finally {
                setLoading(false);
            }
        };

        initializeUser();
    }, [db]);

    const getLastUserId = async () => {
        const lastUserId: number | null = await Storage.getItem(
            "lastUserId"
        ).then((id) => (id ? parseInt(id) : null));
        return lastUserId;
    };

    if (loading) return <div>Loading user...</div>;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};
