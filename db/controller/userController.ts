import { usersTable } from "@/db/schema";
import { DatabaseType } from "@/types/dbType";
import { User } from "@/types/modelTypes";
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

// Creates a new user
// param user: User object with or without an id
// returns the id of the created user (either the id from the user object or the inserted id)
export const createUser = async (
    db: DatabaseType,
    user: Omit<User, "id"> | User
): Promise<number> => {
    try {
        if ("id" in user) {
            const { id, ...rest } = user;
            await db.insert(usersTable).values({ ...rest, id });
            return id;
        } else {
            const addedUserId: { insertedId: number }[] = await db
                .insert(usersTable)
                .values(user)
                .returning({ insertedId: usersTable.id });
            return addedUserId[0].insertedId;
        }
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create user.");
    }
};
