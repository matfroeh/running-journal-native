import React, { useState, ReactNode } from "react";
import { Text, View } from "react-native";

export const FunctionalErrorBoundary = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [error, setError] = useState<Error | null>(null);

    const handleError = (error: Error) => {
        console.error(`Caught by FunctionalErrorBoundary: ${error.message}`);
        setError(error);
    };

    if (error) {
        return (
            <View>
                <Text>Something went wrong:</Text>
                <Text>{error.message}</Text>
            </View>
        );
    }

    return (
        <React.Fragment>
            {React.Children.map(children, (child) =>
                React.cloneElement(child as React.ReactElement, {
                    onError: handleError,
                })
            )}
        </React.Fragment>
    );
};
