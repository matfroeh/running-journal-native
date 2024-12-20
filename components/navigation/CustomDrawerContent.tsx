import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { useTheme } from "react-native-paper";
import { DrawerContentHeader } from "./DrawerContentHeader";

export function CustomDrawerContent(props: DrawerContentComponentProps) {
    const theme = useTheme();

    return (
        <DrawerContentScrollView
            style={{ backgroundColor: theme.colors.background }}
            {...props}
        >
            <DrawerContentHeader />
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}
