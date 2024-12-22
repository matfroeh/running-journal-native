export interface ItemEntity {
    id?: number;
    done: boolean | null;
    value: string | null;
}

//#region Entities

export interface User {
    id: number;
    name: string;
}

export interface Journal {
    id: number;
    userId: number;
    title: string;
    startDate: Date;
    endDate: Date;
}

export interface Run {
    id: number;
    userId: number;
    journalId: number;
    title: string;
    date: Date;
    type?: string;
    notes?: string;
    distance?: number; // in meters
    duration?: number; // in seconds
    pace?: number; // in seconds per kilometer
    heartRate?: number; // in bpm
    effort?: number; // 1-10
}

export interface ScheduledWorkout {
    id: number;
    userId: number;
    journalId: number;
    title: string;
    date: Date;
    type?: string;
    description?: string;
    distance?: number; // in meters
    duration?: number; // in seconds
}

export interface Equipment {
    id: number;
    userId: number;
    name: string;
    brand?: string;
    model?: string;
    type?: string;
    inUseSince?: Date;
    distance?: number; // in meters
    duration?: number; // in seconds
    status: "active" | "retired";
}

export interface RunEquipmentMapping {
    id: number;
    runId: number;
    equipmentId: number;
}

//#endregion

//#region New Entities
export type NewUser = Omit<User, "id">;
export type NewJournal = Omit<Journal, "id">;
export type NewRun = Omit<Run, "id">;
export type NewScheduledWorkout = Omit<ScheduledWorkout, "id">;
export type NewEquipment = Omit<Equipment, "id">;
export type NewRunEquipmentMapping = Omit<RunEquipmentMapping, "id">;
