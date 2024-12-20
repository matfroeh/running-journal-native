import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
    MD3DarkTheme as defaultTheme,
    PaperProvider,
} from "react-native-paper";
import "../global.css";
import { DrawerNavigation } from "@/components/navigation/DrawerNavigation";
import DatabaseContextProvider from "@/context/DatabaseContextProvider";

export default function Layout() {
    return (
        <PaperProvider theme={defaultTheme}>
            <GestureHandlerRootView>
                <DatabaseContextProvider>
                    <DrawerNavigation />
                </DatabaseContextProvider>
            </GestureHandlerRootView>
        </PaperProvider>
    );
}
