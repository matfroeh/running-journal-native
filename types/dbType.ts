import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export type DatabaseType = ExpoSQLiteDatabase<Record<string, never>> & {
    $client: SQLiteDatabase;
};
