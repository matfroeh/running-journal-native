import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
    MD3DarkTheme as defaultTheme,
    PaperProvider,
} from "react-native-paper";
import { DrawerNavigation } from "@/components/navigation/DrawerNavigation";
import DatabaseContextProvider from "@/context/DatabaseContextProvider";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
    return (
        <PaperProvider
            theme={{
                ...defaultTheme,
                colors: { ...defaultTheme.colors },
            }}
        >
            <GestureHandlerRootView style={{ flex: 1 }}>
                <DatabaseContextProvider>
                    <DrawerNavigation />
                </DatabaseContextProvider>
            </GestureHandlerRootView>
            <StatusBar style="auto" />
        </PaperProvider>
    );
}
