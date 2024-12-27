module.exports = function (api) {
    api.cache(true);
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            ["inline-import", { extensions: [".sql"] }],
            [
                "module-resolver",
                {
                    root: ["./"],

                    alias: {
                        "@": "./",
                        "tailwind.config": "./tailwind.config.js",
                    },
                },
            ],
        ],
        env: {
            production: {
                plugins: ["react-native-paper/babel"],
            },
        },
    };
};
