import { DatabaseContext } from "./DatabaseContext";
import * as SQLite from "expo-sqlite";
import { ReactNode, useEffect, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { getUserById } from "@/db/controller/userController";
import { User } from "@/types/modelTypes";

const expo = SQLite.openDatabaseSync("db_test5.db", {
    enableChangeListener: true,
});

// Open the database connection // compiling errors: maybe drizzle is not compatible with openAsync
//     const expo = await SQLite.openDatabaseAsync("db_test4.db", {
//         enableChangeListener: true,
//     });
//     return expo;
// };
// const expo = await connectDb();

const DatabaseContextProvider = ({ children }: { children: ReactNode }) => {
    const db = drizzle(expo);
    const { success, error } = useMigrations(db, migrations);
    console.log("success", success);
    const [user, setUser] = useState<User | null>(null);

    // successful migration required to open the db viewer
    useDrizzleStudio(expo);

    useEffect(() => {
        if (!success) {
            console.log("error", error);
            return;
        }
        // ToDo: if no user is found, redirect to a register page to create a profile
        (async () => {
            const users = await getUserById(db, 1);
            if (users && users.length > 0) {
                setUser(users[0]);
            } else {
                setUser(null);
            }
        })();

        // access error on closing?
        return () => {
            expo?.closeSync();
            expo && console.log("db closed");
        };
    }, [success, error]);

    // migrations, etc.

    return (
        <DatabaseContext.Provider value={{ db, user }}>
            {children}
        </DatabaseContext.Provider>
    );
};

export default DatabaseContextProvider;
