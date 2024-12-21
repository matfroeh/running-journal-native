import { journalsTable } from "@/db/schema";
import { DatabaseType } from "@/types/dbType";
import { Journal } from "@/types/modelTypes";
import { eq, and, desc } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

// All requests are user specific and the function names omit reflecting that

//#region Basic operations

export const getAllJournals = async (db: DatabaseType, userId: number) => {
    const journals = await db
        .select()
        .from(journalsTable)
        .where(eq(journalsTable.userId, userId));

    if (!journals) throw new Error("Journals could not be fetched");

    return journals;
};

export const getJournalsSortedByLatestStartDate = async (
    db: DatabaseType,
    userId: number
) => {
    const journals = await db
        .select()
        .from(journalsTable)
        .orderBy(desc(journalsTable.startDate))
        .where(eq(journalsTable.userId, userId));

    if (!journals) throw new Error("Journals could not be fetched");

    return journals;
};

export const getLatestJournal = async (db: DatabaseType, userId: number) => {
    const [journal] = await db
        .select()
        .from(journalsTable)
        .orderBy(desc(journalsTable.startDate))
        .where(eq(journalsTable.userId, userId))
        .limit(1);

    if (!journal) throw new Error("Journal could not be fetched");

    return journal;
};

// This will be fetched using LiveQuery as this request will be used in the Calendar component
export const getJournalById = async (
    db: DatabaseType,
    userId: number,
    journalId: number
) => {
    const { data: journal, error } = useLiveQuery(
        db
            .select()
            .from(journalsTable)
            .where(
                and(
                    eq(journalsTable.userId, userId),
                    eq(journalsTable.id, journalId)
                )
            )
    );
    if (error) throw new Error(error.message);

    return journal;
};

// We want to always explicitly pass the userId to the create function to avoid any mistakes upon creation and to ease handling during creation
export const createJournal = async (
    db: DatabaseType,
    journal: Omit<Journal, "userId">,
    userId: number
) => {
    const addedJournalId: { insertedId: number }[] = await db
        .insert(journalsTable)
        .values({ ...journal, userId })
        .returning({ insertedId: journalsTable.id });

    if (!addedJournalId) throw new Error("Journal could not be created");

    return addedJournalId;
};

export const updateJournal = async (db: DatabaseType, journal: Journal) => {
    const updatedJournalId: { updatedId: number }[] = await db
        .update(journalsTable)
        .set(journal)
        .where(eq(journalsTable.id, journal.id))
        .returning({ updatedId: journalsTable.id });

    if (!updatedJournalId) throw new Error("Journal could not be updated");

    return updatedJournalId;
};

export const deleteJournal = async (db: DatabaseType, journalId: number) => {
    const deletedJournalId: { deletedId: number }[] = await db
        .delete(journalsTable)
        .where(eq(journalsTable.id, journalId))
        .returning({ deletedId: journalsTable.id });

    if (!deletedJournalId) throw new Error("Journal could not be deleted");

    return deletedJournalId;
};

//#endregion
