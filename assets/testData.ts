import {
    User,
    Journal,
    Run,
    ScheduledWorkout,
    Equipment,
    RunEquipmentMapping,
} from "@/types/modelTypes";

export const users: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
];

export const journals: Journal[] = [
    {
        id: 1,
        userId: 1,
        title: "Alice's Journal",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
    },
    {
        id: 2,
        userId: 2,
        title: "Bob's Journal",
        startDate: new Date("2022-01-14"),
        endDate: new Date("2022-02-31"),
    },
];

export const runs: Run[] = [
    {
        id: 1,
        userId: 1,
        journalId: 1,
        title: "Morning Run",
        type: "Long",
        date: "2024-01-01 06:00:00",
        notes: "Easy morning run",
        distance: 10000,
        duration: 3600,
        pace: 360,
        heartRate: 150,
        effort: 5,
    },
    {
        id: 2,
        userId: 2,
        journalId: 2,
        title: "Evening Run",
        type: "Tempo",
        date: "2022-01-02 18:00:00",
        notes: "Evening tempo run",
        distance: 5000,
        duration: 1800,
    },
    {
        id: 3,
        userId: 1,
        journalId: 1,
        title: "Afternoon Run",
        type: "Interval",
        date: "2024-01-01 15:00:00",
        notes: "Afternoon interval run",
        distance: 8000,
        duration: 2400,
    },
    {
        id: 4,
        userId: 1,
        journalId: 1,
        title: "Run",
        type: "Easy run",
        date: "2024-01-04 15:00:00",
        distance: 8000,
        duration: 2400,
    },
    {
        id: 5,
        userId: 1,
        journalId: 1,
        title: "Run",
        type: "Easy run",
        date: "2024-01-07 15:00:00",
        distance: 8000,
        duration: 2400,
    },
    {
        id: 6,
        userId: 1,
        journalId: 1,
        title: "Run",
        type: "Easy run",
        date: "2024-01-09 15:00:00",
        distance: 10000,
        duration: 2400,
    },
    {
        id: 7,
        userId: 1,
        journalId: 1,
        title: "Run",
        type: "Easy run",
        date: "2024-01-11 15:00:00",
        distance: 5000,
        duration: 1800,
    },
    {
        id: 8,
        userId: 1,
        journalId: 1,
        title: "Run",
        type: "Easy run",
        date: "2024-01-14 15:00:00",
        distance: 8000,
        duration: 2400,
    },
];

export const scheduledWorkouts: ScheduledWorkout[] = [
    {
        id: 1,
        userId: 1,
        journal_id: 1,
        title: "Morning Run",
        date: "2024-01-01 06:00:00",
        type: "Long",
        description: "Easy morning run",
        distance: 10000,
    },
    {
        id: 2,
        userId: 2,
        journal_id: 2,
        title: "Evening Run",
        date: "2022-01-02 18:00:00",
        type: "Tempo",
        description: "Evening tempo run",
        distance: 5000,
    },
    {
        id: 3,
        userId: 1,
        journal_id: 1,
        title: "Afternoon Run",
        date: "2024-01-04 15:00:00",
        type: "Interval",
        description: "Afternoon interval run",
        distance: 8000,
    },
];

export const equipment: Equipment[] = [
    {
        id: 1,
        userId: 1,
        name: "Guide 16",
        brand: "Saucony",
        model: "Guide 16",
        type: "Daily Trainer",
        inUseSince: "2024-01-01",
        distance: 12000,
        duration: 3600,
        status: "active",
    },
    {
        id: 3,
        userId: 1,
        name: "Tempest",
        brand: "Saucony",
        model: "Tempest",
        type: "Speed",
        inUseSince: "2024-05-01",
        distance: 105000,
        duration: 40100,
        status: "active",
    },
    {
        id: 4,
        userId: 1,
        name: "Shoes",
        brand: "Nike",
        model: "Pegasus",
        type: "Running",
        inUseSince: "2024-01-01",
        distance: 500000,
        duration: 180000,
        status: "retired",
    },
    {
        id: 5,
        userId: 2,
        name: "Shoes",
        brand: "other brand",
        model: "some model",
        type: "Running",
        inUseSince: "2024-03-01",
        distance: 105000,
        duration: 3600,
        status: "active",
    },
];

export const runsEquipmentMapping: RunEquipmentMapping[] = [
    { id: 1, runId: 1, equipmentId: 1 },
    { id: 2, runId: 3, equipmentId: 3 },
    { id: 3, runId: 1, equipmentId: 3 },
    { id: 4, runId: 2, equipmentId: 5 },
];
