import React from "react";
import {
    SafeAreaView,
    SafeAreaViewProps,
} from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { PropsWithChildren } from "react";

type SafeAreaViewThemedProps = PropsWithChildren<SafeAreaViewProps>;

export const SafeAreaViewThemed = ({
    children,
    style,
    ...rest
}: SafeAreaViewThemedProps) => {
    const theme = useTheme();

    return (
        <SafeAreaView
            style={[
                { flex: 1, backgroundColor: theme.colors.background },
                style,
            ]}
            {...rest}
        >
            {children}
        </SafeAreaView>
    );
};
