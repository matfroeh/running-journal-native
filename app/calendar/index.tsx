import { useDatabase } from "@/context/DatabaseContext";
import {
    Journal,
    User,
    Run,
    ScheduledWorkout,
    Equipment,
    RunEquipmentMapping,
} from "@/types/modelTypes";
import {
    journalsTable,
    usersTable,
    runsTable,
    scheduledWorkoutsTable,
    equipmentTable,
    runsEquipmentTable,
} from "@/db/schema";
import { Button, Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";

const Calendar = () => {
    const { db, user } = useDatabase();
    const theme = useTheme();

    if (!db) {
        return <Text>Database not found</Text>;
    }

    if (!user) {
        return <Text>User not found</Text>;
    }

    // ToDo: get journal by date of maybe we integrate a setCurrent setting saved in local storage
    // and fetch the latest journal entry by default as long setCurrent is not set
    const { data: journals } = useLiveQuery(
        db.select().from(journalsTable).where(eq(journalsTable.userId, user.id))
    );

    const firstJournalEntry: Journal = journals[0];

    console.log("data", journals);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: theme.colors.background,
            }}
        >
            <Text>{firstJournalEntry.title}</Text>
        </View>
    );
};

export default Calendar;
