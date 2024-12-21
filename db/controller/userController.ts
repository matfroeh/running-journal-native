import { usersTable } from "@/db/schema";
import { DatabaseType } from "@/types/dbType";
import { eq } from "drizzle-orm";

export const getUserById = async (db: DatabaseType, id: number) => {
    try {
        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, id));
        return user;
    } catch (error) {
        console.error(error);
    }
};
