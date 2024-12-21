import React from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { PropsWithChildren } from "react";

type ViewThemedProps = PropsWithChildren<ViewProps>;

export const ViewThemed = ({ children, style, ...rest }: ViewThemedProps) => {
    const theme = useTheme();

    return (
        <View
            style={[
                { flex: 1, backgroundColor: theme.colors.background },
                style,
            ]}
            {...rest}
        >
            {children}
        </View>
    );
};

// import { View } from "react-native";
// import { useTheme } from "react-native-paper";
// import { PropsWithChildren } from "react";

// export const ViewThemed = ({ children }: PropsWithChildren) => {
//     const theme = useTheme();

//     return (
//         <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
//             {children}
//         </View>
//     );
// };
