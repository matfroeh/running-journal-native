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
    user_id: number;
    title: string;
    start_date: string; // sqlite date format: YYYY-MM-DD returned as string
    end_date: string;
}

export interface Run {
    id: number;
    user_id: number;
    journal_id: number;
    date: string; // sqlite datetime format: YYYY-MM-DD HH:MM:SS returned as string
    description: string;
    distance: number;
    duration: string; // sqlite time format: HH:MM:SS returned as string
}
