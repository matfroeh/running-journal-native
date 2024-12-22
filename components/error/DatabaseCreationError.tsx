import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { ViewThemed } from "@/components/generic";
import headerImage from "@/assets/images/drawerHeader.png";
import { ImageBackground } from "expo-image";

export const DatabaseCreationError = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "black",
            }}
        >
            <ViewThemed
                style={{
                    flex: 1,
                    alignItems: "center",
                    // justifyContent: "center",
                }}
            >
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
                    <Text
                        style={{
                            fontSize: 22,
                            paddingLeft: 10,
                            paddingTop: 5,
                            fontWeight: "bold",
                            color: "black",
                        }}
                    >
                        Running Journal
                    </Text>
                </ImageBackground>

                <Text
                    variant="headlineMedium"
                    style={{
                        textAlign: "center",
                        marginTop: 40,
                        color: "yellow",
                        borderStyle: "solid",
                        borderWidth: 2,
                        borderColor: "yellow",
                    }}
                >
                    Error Creating the Database on Your Device.
                </Text>
                <Text
                    variant="bodyLarge"
                    style={{ padding: 10, marginTop: 20 }}
                >
                    Running Journal is based on a local SQLite database. Please
                    make sure Running Journal has the permissions to create a
                    database on your device.
                </Text>
            </ViewThemed>
        </SafeAreaView>
    );
};
