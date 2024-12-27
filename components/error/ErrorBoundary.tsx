import React, { Component } from "react";
import { ViewThemed, SafeAreaViewThemed } from "../generic";
import { Button, Text } from "react-native-paper";
import { reloadAppAsync } from "expo";

const reloadApp = async () => {
    await reloadAppAsync(
        "Reloaded from Error Boundary Wrapping DatabaseContextProvider by User Action"
    );
};

const defaultErrorElement = (
    <SafeAreaViewThemed>
        <ViewThemed style={{ alignItems: "center" }}>
            <Text>Something went wrong</Text>
            <Button className="mt-24" mode="contained" onPress={reloadApp}>
                Reload Running Journal
            </Button>
        </ViewThemed>
    </SafeAreaViewThemed>
);

interface ErrorBoundaryState {
    hasError: boolean;
    children?: React.ReactNode;
}

interface ErrorBoundaryProps {
    fallback?: React.ReactNode;
    children?: React.ReactNode;
}

export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: {}) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || defaultErrorElement;
        }

        return this.props.children;
    }
}
