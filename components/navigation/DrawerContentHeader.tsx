import { Text } from "react-native";
import { ImageBackground } from "expo-image";
import headerImage from "@/assets/images/drawerHeader.png";

export const DrawerContentHeader = () => {
    return (
        <ImageBackground
            source={headerImage}
            style={{
                width: "100%",
                height: 150,
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 16,
            }}
        >
            <Text className="text-2xl pl-2 pt-0.5 font-semibold text-black">
                Running Journal
            </Text>
        </ImageBackground>
    );
};
