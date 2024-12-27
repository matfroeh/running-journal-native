import { usersTable } from "@/db/schema";
import { DatabaseType } from "@/types/dbType";
import { User, NewUser } from "@/types/modelTypes";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

export const getAllUsers = async (db: DatabaseType): Promise<User[]> => {
    try {
        const users = await db.select().from(usersTable);
        return users;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get users.");
    }
};

export const getLiveUserById = (db: DatabaseType, id: number) => {
    const { data: user, error } = useLiveQuery(
        db.selectDistinct().from(usersTable).where(eq(usersTable.id, id))
    );
    if (error) throw new Error(error.message);
    return { user: user[0], error };
};

export const getUserById = async (
    db: DatabaseType,
    id: number
): Promise<User> => {
    try {
        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, id));
        return user[0];
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to get user with id ${id}.`);
    }
};

export const createUser = async (
    db: DatabaseType,
    user: NewUser
): Promise<number> => {
    try {
        const addedUserId: { insertedId: number }[] = await db
            .insert(usersTable)
            .values(user)
            .returning({ insertedId: usersTable.id });
        return addedUserId[0].insertedId;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create user.");
    }
};
