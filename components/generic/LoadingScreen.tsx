import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { SafeAreaViewThemed } from "./SafeAreaViewThemed";
import { ViewThemed } from "./ViewThemed";
import { LinearGradient } from "expo-linear-gradient";

export const LoadingScreen = () => {
    const theme = useTheme();
    return (
        <SafeAreaViewThemed>
            {/* Gradient needs rebuilt */}
            {/* <LinearGradient style={{ flex: 1 }} colors={["#161b2e", "#766e67"]}>  */}
            <ViewThemed
                style={{
                    justifyContent: "center",
                    backgroundColor: "transparent",
                }}
            >
                <ActivityIndicator
                    animating={true}
                    color={theme.colors.primary}
                    size={80}
                />
                <Text
                    style={{ textAlign: "center", marginTop: 80 }}
                    className="text-xl"
                >
                    Loading...
                </Text>
            </ViewThemed>
            {/* </LinearGradient> */}
        </SafeAreaViewThemed>
    );
};
