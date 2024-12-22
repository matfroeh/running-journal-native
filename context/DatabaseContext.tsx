import { createContext, useContext } from "react";
import { DatabaseType } from "@/types/dbType";
import { User } from "@/types/modelTypes";

// We will ensure that the db and user are not null because:
// 1. A new db file is created if it does not exist, any error during creation will be caught at the DatabaseProvider layer
// 2. A default user is created if userTable is empty
interface DatabaseContextTypes {
    db: DatabaseType;
    user: User;
    loading: boolean;
}

export const DatabaseContext = createContext<DatabaseContextTypes>(
    {} as DatabaseContextTypes
);

// old code with null values
// interface DatabaseContextTypes {
//     db: DatabaseType;
//     user: User;
// }

// export const DatabaseContext = createContext<DatabaseContextTypes>({
//     db: null,
//     user: null,
// });

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context)
        throw new Error("useDb must be used within an AuthContextProvider");
    return context;
};
