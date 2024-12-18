export const createItemsTable = `CREATE TABLE IF NOT EXISTS Items (
id INTEGER PRIMARY KEY NOT NULL, 
done INT, 
value TEXT);`;

export const createJournalTable = `CREATE TABLE IF NOT EXISTS Journals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);`;

export const createUsersTable = `CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);`;

export const createRunsTable = `CREATE TABLE IF NOT EXISTS Runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    journal_id INTEGER,
    date DATETIME NOT NULL,
    description TEXT NOT NULL,
    distance FLOAT,
    duration TIME,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (journal_id) REFERENCES Journals(id)
);`;
