import "../global.css";
import "@/global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3DarkTheme as darkTheme, PaperProvider } from "react-native-paper";
import { DrawerNavigation } from "@/components/navigation/DrawerNavigation";
import DatabaseContextProvider from "@/context/DatabaseContextProvider";
import { StatusBar } from "expo-status-bar";
import { ErrorBoundary } from "@/components/error";
import "expo-dev-client";

export default function Layout() {
    return (
        <PaperProvider
            theme={{
                ...darkTheme,
                colors: { ...darkTheme.colors },
            }}
        >
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ErrorBoundary>
                    <DatabaseContextProvider>
                        <DrawerNavigation />
                    </DatabaseContextProvider>
                </ErrorBoundary>
            </GestureHandlerRootView>
            {/* Add light theme later */}
            <StatusBar style={darkTheme ? "light" : "auto"} />
        </PaperProvider>
    );
}
