import { sql } from "drizzle-orm";
import { integer, unique, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const itemsTable = sqliteTable("items", {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    done: integer({ mode: "boolean" }),
    value: text(),
});

export const users = sqliteTable("users", {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text(),
});

export const journals = sqliteTable("journals", {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: integer("user_id", { mode: "number" })
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    title: text().notNull(),
    startDate: integer("start_date", { mode: "timestamp" }).notNull(),
    endDate: integer("end_date", { mode: "timestamp" }).notNull(),
});

export const runs = sqliteTable("runs", {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    userId: integer("user_id", { mode: "number" })
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    date: integer({ mode: "timestamp" }).notNull(),
    // optionals
    journalId: integer("journal_id", { mode: "number" }).references(
        () => journals.id,
        { onDelete: "set null" } // remove journal, keep run
    ),
    type: text(), // run type: long, tempo, interval, etc.
    notes: text(),
    distance: integer({ mode: "number" }), // in meters
    duration: integer({ mode: "number" }), // in seconds
    pace: integer({ mode: "number" }), // in seconds per kilometer
    heartRate: integer("heart_rate", { mode: "number" }), // in bpm
    effort: integer({ mode: "number" }), // 1-10
    equipmentIds: text("equipment_ids", { mode: "json" })
        .$type<number[]>()
        .references(() => equipment.id), // array of equipment ids
});

export const scheduledWorkouts = sqliteTable("scheduled_workouts", {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    // optionals
    date: integer({ mode: "timestamp" }), // optional, as there could pre-defined workouts
    userId: integer("user_id", { mode: "number" }).references(() => users.id, {
        onDelete: "cascade",
    }), // optional, as there could be pre-defined workouts
    journalId: integer("journal_id", { mode: "number" }).references(
        () => journals.id,
        { onDelete: "set null" } // remove journal, keep run
    ), // optional
    type: text(), // workout type: long, tempo, interval, etc.
    description: text(), // optional
    distance: integer({ mode: "number" }), // in meters
    duration: integer({ mode: "number" }), // in seconds
});

export const equipment = sqliteTable("equipment", {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: integer("user_id", { mode: "number" }).references(() => users.id, {
        onDelete: "cascade",
    }),
    name: text().notNull(),
    status: text({ enum: ["active", "retired"] })
        .notNull()
        .default("active"), // active, retired, etc.
    brand: text(),
    model: text(),
    type: text(),
    inUseSince: integer("in_use_since", { mode: "timestamp" }),
    distance: integer({ mode: "number" }), // in meters
    duration: integer({ mode: "number" }), // in seconds
});
