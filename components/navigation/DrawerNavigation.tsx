import { Drawer } from "expo-router/drawer";
import { useTheme, Icon } from "react-native-paper";
import { CustomDrawerContent } from "@/components/navigation/";

export const DrawerNavigation = () => {
    const theme = useTheme();

    const headerStyle = {
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.onBackground,
        drawerActiveTintColor: theme.colors.onPrimaryContainer,
        drawerActiveBackgroundColor: theme.colors.primaryContainer,
        drawerInactiveTintColor: theme.colors.onBackground,
    };

    return (
        <Drawer
            screenOptions={headerStyle}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: "Home",
                    title: "Running Journal",
                    drawerIcon: ({ color, size }) => (
                        <Icon source="home" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="calendar/index"
                options={{
                    drawerLabel: "Calendar",
                    title: "Calendar",
                    drawerIcon: ({ color, size }) => (
                        <Icon source="calendar" color={color} size={size} />
                    ),
                }}
            />
        </Drawer>
    );
};

export default Drawer;
