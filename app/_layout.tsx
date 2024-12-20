import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
    MD3DarkTheme as defaultTheme,
    Icon,
    PaperProvider,
} from "react-native-paper";
import "../global.css";
import { Text } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import {
    DrawerNavigationHelpers,
    DrawerDescriptorMap,
} from "@react-navigation/drawer/lib/typescript/commonjs/src/types";
import { DrawerNavigationState, ParamListBase } from "@react-navigation/native";
import { JSX } from "react";
import { Image, ImageBackground } from "expo-image";

export default function Layout() {
    return (
        <PaperProvider theme={defaultTheme}>
            <GestureHandlerRootView>
                <Drawer
                    screenOptions={{
                        drawerActiveTintColor:
                            defaultTheme.colors.onPrimaryContainer,
                        drawerActiveBackgroundColor:
                            defaultTheme.colors.primaryContainer,
                        drawerInactiveTintColor:
                            defaultTheme.colors.onBackground,
                    }}
                    drawerContent={(props) => (
                        <CustomDrawerContent {...props} />
                    )}
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
                                <Icon
                                    source="calendar"
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}
                    />
                </Drawer>
            </GestureHandlerRootView>
        </PaperProvider>
    );
}

function CustomDrawerContent(
    props: JSX.IntrinsicAttributes & {
        state: DrawerNavigationState<ParamListBase>;
        navigation: DrawerNavigationHelpers;
        descriptors: DrawerDescriptorMap;
    }
) {
    return (
        <DrawerContentScrollView
            style={{ backgroundColor: defaultTheme.colors.background }}
            {...props}
        >
            <ImageBackground
                source={require("@/assets/images/drawerHeader.png")}
                style={{
                    width: "100%",
                    height: 150,
                    borderRadius: 10,
                    overflow: "hidden",
                    marginBottom: 16,

                    // resizeMode: "cover",
                }}
            >
                <Text className="text-2xl pl-2 pt-0.5 font-semibold text-black">
                    Running Journal
                </Text>
            </ImageBackground>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}
