import { useDatabase } from "@/context/DatabaseContext";
import { Journal } from "@/types/modelTypes";
import { Text, useTheme } from "react-native-paper";
import { getLatestJournal } from "@/db/controller";
import { useEffect, useState } from "react";
import { ViewThemed } from "@/components/generic";
import { Text as TextNative } from "react-native";

const Calendar = () => {
    const { db, user } = useDatabase();
    const theme = useTheme();
    console.log("user", user);
    // console.log("db", db);

    const [journal, setJournal] = useState<Journal | null>(null);

    const runs = [
        {
            title: "Run 1",
        },
        {
            title: "Run 2",
        },
        {
            title: "Run 3",
        },
        {
            title: "Run 4",
        },
    ];

    const runsTwo = [
        {
            title: "Run 5",
        },
        {
            title: "Run 6",
        },
        {
            title: "Run 7",
        },
        {
            title: "Summary",
        },
    ];

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
        <ViewThemed
            style={{ flex: 1, backgroundColor: theme.colors.background }}
        >
            <ViewThemed
                style={{
                    alignItems: "center",
                    padding: 10,
                    flex: 0,
                    borderStyle: "solid",
                    borderWidth: 2,
                }}
            >
                <Text className="text-xl text-slate-700">{journal?.title}</Text>
                <TextNative className="text-slate-700">
                    {journal?.title}
                </TextNative>
            </ViewThemed>
            {/* <ViewThemed style={{ flex: 1 }} className="border-2">
                <HStack space="sm" className="py-1">
                    {runs.map((run, index) => (
                        <RunCard key={index} content={run} />
                    ))}
                </HStack>
                <HStack space="sm" className="py-1">
                    {runsTwo.map((run, index) => (
                        <RunCard key={index} content={run} />
                    ))}
                </HStack>
                <Divider orientation="horizontal" className="bg-white" />
                <HStack space="sm" className="py-1">
                    {runs.map((run, index) => (
                        <RunCard key={index} content={run} />
                    ))}
                </HStack>
                <HStack space="sm" className="py-1">
                    {runsTwo.map((run, index) => (
                        <RunCard key={index} content={run} />
                    ))}
                </HStack>
            </ViewThemed> */}
            {/* <ViewThemed style={{ flex: 4 }} className="p-6">
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
            </ViewThemed> */}
        </ViewThemed>
    );
};

export default Calendar;
