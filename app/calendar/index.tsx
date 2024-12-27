import { useDatabase } from "@/context/DatabaseContext";
import { Journal } from "@/types/modelTypes";
import { Button, Text, useTheme, Card } from "react-native-paper";
import { getLatestJournal } from "@/db/controller";
import { useEffect, useState } from "react";
import { ViewThemed } from "@/components/generic";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/ui/input";

const Calendar = () => {
    const { db, user } = useDatabase();
    const theme = useTheme();
    console.log("user", user);
    // console.log("db", db);

    const [journal, setJournal] = useState<Journal | null>(null);

    if (!db) {
        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: theme.colors.background }}
            >
                <ViewThemed>
                    <Text>Database not found</Text>
                </ViewThemed>
            </SafeAreaView>
        );
    }

    if (!user) {
        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: theme.colors.background }}
            >
                <ViewThemed>
                    <Text>User not found</Text>
                </ViewThemed>
            </SafeAreaView>
        );
    }

    // ToDo: get journal by date of maybe we integrate a setCurrent setting saved in local storage
    // and fetch the latest journal entry by default as long setCurrent is not set
    useEffect(() => {
        (async () => {
            console.log("async");

            try {
                const firstJournalEntry = await getLatestJournal(db, user.id);
                console.log("firstJournalEntry", firstJournalEntry);
                setJournal(firstJournalEntry);
            } catch (error) {
                console.error("Error fetching journal", error);
                throw new Error("Error fetching journal");
            }
        })();
    }, [db, user]);

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.background }}
        >
            <ViewThemed
                style={{
                    alignItems: "center",
                    flex: 1,
                }}
            >
                <Text>{journal?.title}</Text>
            </ViewThemed>
            <ViewThemed style={{ flex: 3 }} className="flex-row justify-center">
                <Card mode="contained" style={{ flex: 1, width: 100 }}>
                    <Card.Title titleVariant="bodySmall" title="Card Title" />
                    <Card.Content>
                        <Text variant="labelSmall">Blabla</Text>
                    </Card.Content>
                </Card>
            </ViewThemed>
            <ViewThemed style={{ flex: 4 }} className="p-6">
                <Input
                    variant="underlined"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >
                    <InputField
                        style={{ flex: 3 }}
                        placeholder="Enter Text here..."
                    />
                </Input>
            </ViewThemed>
        </SafeAreaView>
    );
};

export default Calendar;
