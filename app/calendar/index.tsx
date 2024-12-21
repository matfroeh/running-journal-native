import { useDatabase } from "@/context/DatabaseContext";
import { Journal } from "@/types/modelTypes";
import { Button, Text, useTheme } from "react-native-paper";
import { getLatestJournal } from "@/db/controller";
import { useEffect, useState } from "react";
import { ViewThemed } from "@/components/generic";

const Calendar = () => {
    const { db, user } = useDatabase();
    const theme = useTheme();
    console.log("user", user);
    console.log("db", db);

    const [journal, setJournal] = useState<Journal | null>(null);

    if (!db) {
        return (
            <ViewThemed>
                <Text>Database not found</Text>
            </ViewThemed>
        );
    }

    if (!user) {
        return (
            <ViewThemed>
                <Text>User not found</Text>
            </ViewThemed>
        );
    }

    // ToDo: get journal by date of maybe we integrate a setCurrent setting saved in local storage
    // and fetch the latest journal entry by default as long setCurrent is not set
    useEffect(() => {
        (async () => {
            console.log("async");

            const firstJournalEntry = await getLatestJournal(db, user.id);
            console.log("firstJournalEntry", firstJournalEntry);
            setJournal(firstJournalEntry);
        })();
    }, [db, user]);

    return (
        <ViewThemed
            style={{
                alignItems: "center",
            }}
        >
            <Text>{journal?.title}</Text>
        </ViewThemed>
    );
};

export default Calendar;
