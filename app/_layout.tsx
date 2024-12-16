import { Stack } from "expo-router";
import "../global.css";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "#f5f5f5" },
                headerTintColor: "#333",
            }}
        />
    );
}
