import { ViewThemed } from "@/components/generic";
import { Button, Text } from "react-native-paper";
import { useDatabase } from "@/context/DatabaseContext";
import { importTestData as importData } from "@/lib/testing";

const TestDataImport = () => {
    const { db } = useDatabase();

    const importTestData = async () => {
        if (!db) {
            console.log("no db connection");
            return;
        }
        console.log("importing test data");
        await importData(db);
        console.log("done importing test data");
    };

    return (
        <ViewThemed className="items-center">
            <Text className="mb-10">TestDataImport</Text>
            <Button mode="contained" onPress={() => importTestData()}>
                Import Test Data
            </Button>
        </ViewThemed>
    );
};

export default TestDataImport;
