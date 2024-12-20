import { View, Text, Pressable } from "react-native";
import { useDatabase } from "@/context/DatabaseContext";
import {
    journals as journalTestData,
    users as userTestData,
} from "@/assets/testData";
import { Journal, User } from "@/types/modelTypes";
import { journalsTable, usersTable } from "@/db/schema";

const Calendar = () => {
    const db = useDatabase();
    console.log("db", db);

    const insertTestData = async () => {
        console.log("inserting test data");

        // successfully inserted test data of users and journals
        // await db.insert(usersTable).values(userTestData).onConflictDoNothing();
        // await db
        //     .insert(journalsTable)
        //     .values(journalTestData)
        //     .onConflictDoNothing();
        console.log("test data inserted");
    };

    return (
        <View>
            <Text>Calendar</Text>
            <Pressable onPress={() => insertTestData()}>
                <Text>Press me</Text>
            </Pressable>
        </View>
    );
};

export default Calendar;
