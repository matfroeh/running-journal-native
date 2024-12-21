import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
    MD3DarkTheme as defaultTheme,
    PaperProvider,
} from "react-native-paper";
import { DrawerNavigation } from "@/components/navigation/DrawerNavigation";
import DatabaseContextProvider from "@/context/DatabaseContextProvider";

export default function Layout() {
    return (
        <PaperProvider
            theme={{
                ...defaultTheme,
                colors: { ...defaultTheme.colors, primary: "#663399" },
            }}
        >
            <GestureHandlerRootView style={{ flex: 1 }}>
                <DatabaseContextProvider>
                    <DrawerNavigation />
                </DatabaseContextProvider>
            </GestureHandlerRootView>
        </PaperProvider>
    );
}
