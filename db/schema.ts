import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const itemsTable = sqliteTable("items", {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    done: integer({ mode: "boolean" }),
    value: text(),
});
