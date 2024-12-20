export interface ItemEntity {
    id?: number;
    done: boolean | null;
    value: string | null;
}

export interface User {
    id: number;
    name: string;
}

export interface Journal {
    id: number;
    userId: number;
    title: string;
    startDate: string; // sqlite date format: YYYY-MM-DD returned as string
    endDate: string;
}

export interface Run {
    id: number;
    userId: number;
    journalId: number;
    title: string;
    date: string; // sqlite datetime format: YYYY-MM-DD HH:MM:SS returned as string
    type?: string;
    notes?: string;
    distance?: number; // in meters
    duration?: number; // in seconds
    pace?: number; // in seconds per kilometer
    heartRate?: number; // in bpm
    effort?: number; // 1-10
    equipmentIds?: number[]; // array of equipment ids
}

export interface ScheduledWorkout {
    id: number;
    userId: number;
    journal_id: number;
    title: string;
    date: string;
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
    inUseSince?: string;
    distance?: number; // in meters
    duration?: number; // in seconds
    status: Status; // active or retired
}

enum Status {
    Active = "active",
    Retired = "retired",
}
