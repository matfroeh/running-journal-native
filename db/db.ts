import { type SQLiteDatabase } from "expo-sqlite";
import {
    createItemsTable,
    createJournalTable,
    createRunsTable,
    createUsersTable,
} from "./sqlStatements";
import { ItemEntity, User } from "@/db/modelTypes";

//#region Create Database

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    let result = await db.getFirstAsync<{ user_version: number }>(
        "PRAGMA user_version"
    );
    console.log("result", result);

    let currentDbVersion = result ? result.user_version : 0;

    // force entering create-tables block
    currentDbVersion = 0;

    console.log("currentDbVersion", currentDbVersion);

    if (currentDbVersion >= DATABASE_VERSION) {
        return;
    }
    if (currentDbVersion === 0) {
        await db.execAsync(`
PRAGMA journal_mode = 'wal';
${createItemsTable}
${createUsersTable}
${createJournalTable}
${createRunsTable}
`);
        currentDbVersion = 1;
    }

    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

//#endregion

//#region DB Operations

//
//
//

//#region Items
export async function getItemsAsync(
    db: SQLiteDatabase,
    done: ItemEntity["done"]
) {
    const res = await db.getAllAsync<ItemEntity>(
        "SELECT * FROM items WHERE done = ?",
        done
    );
    // console.log("get all items", res);
    return res;
}

export async function addItemAsync(
    db: SQLiteDatabase,
    text: string
): Promise<void> {
    if (text !== "") {
        await db.runAsync(
            "INSERT INTO items (done, value) VALUES (?, ?);",
            false,
            text
        );
    }
}

export async function addItemAsyncNew(db: SQLiteDatabase, item: ItemEntity) {
    if (item.value !== "") {
        try {
            const { done, value } = item;
            const values = [done, value];
            await db.runAsync(
                "INSERT INTO items (done, value) VALUES (?, ?);",
                values
            );
        } catch (error) {
            console.log("Error inserting data:", error);
        }
    }
}

export async function updateItemAsDoneAsync(
    db: SQLiteDatabase,
    id: number
): Promise<void> {
    await db.runAsync("UPDATE items SET done = ? WHERE id = ?;", true, id);
}

export async function deleteItemAsync(
    db: SQLiteDatabase,
    id: number
): Promise<void> {
    await db.runAsync("DELETE FROM items WHERE id = ?;", id);
}

//#endregion

//#region Users

export async function getUsers(db: SQLiteDatabase) {
    const res = await db.getAllAsync<User>("SELECT * FROM users");
    // console.log("get all users", res);
    return res;
}

export async function getUserById(db: SQLiteDatabase, id: User["id"]) {
    const res = await db.getFirstAsync<User>(
        "SELECT * FROM users WHERE id = ?;",
        id
    );
    // console.log("get user by id", res);
    return res;
}

export async function createUser(db: SQLiteDatabase, name: User["name"]) {
    const res = await db.runAsync("INSERT INTO users (name) VALUES (?);", name);
    // console.log("create user", res);
    return res;
}

export async function deleteUser(db: SQLiteDatabase, id: User["id"]) {
    const res = await db.runAsync("DELETE FROM users WHERE id = ?;", id);
    // console.log("delete user", res);
    return res;
}

export async function updateUser(db: SQLiteDatabase, user: User) {
    const res = await db.runAsync(
        "UPDATE users SET name = ? WHERE id = ?;",
        user.name,
        user.id
    );
    // console.log("update user", res);
    return res;
}

//#endregion
