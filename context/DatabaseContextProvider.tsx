import { DatabaseContext } from "./DatabaseContext";
import * as SQLite from "expo-sqlite";
import { ReactNode, useEffect } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";

const expo = SQLite.openDatabaseSync("db_test4.db", {
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

    // successful migration required to open the db viewer
    useDrizzleStudio(expo);

    useEffect(() => {
        if (!success) {
            console.log("error", error);
            return;
        }
        // access error on closing?
        // return () => {
        //     expo?.closeSync();
        // };
    }, [success, error]);

    // migrations, etc.

    return (
        <DatabaseContext.Provider value={db}>
            {children}
        </DatabaseContext.Provider>
    );
};

export default DatabaseContextProvider;
