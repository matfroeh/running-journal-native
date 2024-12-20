//#region Documentation

// Defines the schema for the SQLite database using Drizzle ORM.
// (npx drizzle-kit generate) will generate the SQLite database schema from this file and saved to drizzle/[migrationName].sql .
// sqliteTable is marked as deprecated concerning the third parameters now passed as an array not an object, though this is not supported yet as of "version": "0.38.2".
//
//
// Remarks on the overall database structure:
// The database is designed to store data for a running journal application.
// The App is focused on providing maximal overview over long training periods of one's running activities.
//
// The database consists of five tables: users, journals, runs, scheduled_workouts, equipment.
// A journal represents a period of time, a training block, which typically lasts several weeks to months.
//
// For this period, the user typically plans his workout runs (scheduledWorkouts) and records his actual runs (runs).
// Typically, the app provides a training block creator feature, where the user provides basic information about his running days, weekly mileage, in km ;).
// This will then automatically create the scheduled workouts for the user as a basic template that requires less manual input but due to the nature of running training still requires adjustments by the user.
//
// The run and the workout will be typically associated with the journal upon creation/record by foreign keys.
// This is optional in the schema, but will likely not handled in that way in the typical app usage.
// However, workout runs could be pre-defined and not associated with a journal in a possible UI implementation.
//
// The user can also keep track of his equipment, such as shoes, watches, etc.
// Multiple equipment pieces are in principle allowed for a run by the table runs_equipment_mapping (many-to-many relationship).
//
// Runs will store the fundamental data of a run: date, distance, duration, pace, heart rate, effort, notes, type.
// This will be handled by uploading gpx data, which will be parsed similar to the running-journal web app.
// Gpx will not be stored, as this is not in the scope of the application and not concerned with showing the routes of each run.

// Remarks on used data types:
// Dates are stored as integers in SQLite as Unix timestamps, so we use the "timestamp" mode; Drizzle will convert Date objects to Unix timestamps when reading and vice-versa when writing to the database.
// Distances, Duration are stored as integers in meters, seconds, respectively, as this appears to be more appropriate as reals are not needed for these values.
// Pace is stored as an integer in seconds per kilometer, which is precise enough and can be easily converted to floating min/km, though unintuitive admittedly.

// endregion
import {
    integer,
    sqliteTable,
    text,
    uniqueIndex,
} from "drizzle-orm/sqlite-core";

//#region Drizzle Schema
// just a test table ToDo: remove
export const itemsTable = sqliteTable("items", {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    done: integer({ mode: "boolean" }),
    value: text(),
});

export const usersTable = sqliteTable("users", {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text().notNull(), // ToDo: not null was missing in latest migration
});

export const journalsTable = sqliteTable("journals", {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: integer("user_id", { mode: "number" })
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    title: text().notNull(),
    startDate: integer("start_date", { mode: "timestamp" }).notNull(),
    endDate: integer("end_date", { mode: "timestamp" }).notNull(),
});

export const runsTable = sqliteTable("runs", {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    userId: integer("user_id", { mode: "number" })
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    date: integer({ mode: "timestamp" }).notNull(),
    // optionals
    journalId: integer("journal_id", { mode: "number" }).references(
        () => journalsTable.id,
        { onDelete: "set null" } // remove journal, keep run
    ),
    type: text(), // run type: long, tempo, interval, etc.
    notes: text(),
    distance: integer({ mode: "number" }), // in meters
    duration: integer({ mode: "number" }), // in seconds
    pace: integer({ mode: "number" }), // in seconds per kilometer
    heartRate: integer("heart_rate", { mode: "number" }), // in bpm
    effort: integer({ mode: "number" }), // 1-10
    // This won't work as sqlite will not enforce foreign key constraints on arrays
    // equipmentIds: text("equipment_ids", { mode: "json" })
    //     .$type<number[]>()
    //     .references(() => equipment.id), // array of equipment ids
});

export const runsEquipmentTable = sqliteTable(
    "runs_equipment_mapping",
    {
        id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
        runId: integer("run_id", { mode: "number" })
            .notNull()
            .references(() => runsTable.id, {
                onDelete: "cascade",
            }),
        equipmentId: integer("equipment_id", { mode: "number" })
            .notNull()
            .references(() => equipmentTable.id, { onDelete: "cascade" }),
    },

    // unique constraint: no duplicate equipment for a run
    (table) => ({
        runEquipmentUniqueIndex: uniqueIndex("runEquipmentUniqueIndex").on(
            table.runId,
            table.equipmentId
        ),
    })
);

export const scheduledWorkoutsTable = sqliteTable("scheduled_workouts", {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    // optionals
    date: integer({ mode: "timestamp" }), // optional, as there could be pre-defined workouts
    userId: integer("user_id", { mode: "number" }).references(
        () => usersTable.id,
        {
            onDelete: "cascade",
        }
    ), // optional, as there could be pre-defined workouts for all users
    journalId: integer("journal_id", { mode: "number" }).references(
        () => journalsTable.id,
        { onDelete: "set null" } // remove journal, keep workout
    ), // optional
    type: text(), // workout type: long, tempo, interval, but also rest days, strength training, etc.
    description: text(), // optional
    distance: integer({ mode: "number" }), // in meters
    duration: integer({ mode: "number" }), // in seconds
});

export const equipmentTable = sqliteTable("equipment", {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: integer("user_id", { mode: "number" }).references(
        () => usersTable.id,
        {
            onDelete: "cascade",
        }
    ),
    name: text().notNull(),
    status: text({ enum: ["active", "retired"] })
        .notNull()
        .default("active"),
    brand: text(),
    model: text(),
    type: text(),
    inUseSince: integer("in_use_since", { mode: "timestamp" }),
    distance: integer({ mode: "number" }), // in meters
    duration: integer({ mode: "number" }), // in seconds
});
