// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react-native";
// import DatabaseContextProvider from "@/context/DatabaseContextProvider";
// import * as SQLite from "expo-sqlite";
// import { drizzle } from "drizzle-orm/expo-sqlite";
// import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
// import { getAllUsers, createUser } from "@/db/controller/userController";
// import { DatabaseContext } from "@/context/DatabaseContext";
// import { DatabaseCreationError } from "@/components/error";
// import { Text } from "react-native-paper";
// import { FunctionalErrorBoundary } from "@/components/error";

// // Mock dependencies
// jest.mock("expo-sqlite", () => ({
//     openDatabaseSync: jest.fn(() => ({
//         closeSync: jest.fn(),
//     })),
// }));

// jest.mock("drizzle-orm/expo-sqlite", () => ({
//     drizzle: jest.fn(),
// }));

// jest.mock("drizzle-orm/expo-sqlite/migrator", () => ({
//     useMigrations: jest.fn(),
// }));

// jest.mock("expo-drizzle-studio-plugin", () => ({
//     useDrizzleStudio: jest.fn(),
// }));

// jest.mock("@/db/controller/userController", () => ({
//     getAllUsers: jest.fn(),
//     createUser: jest.fn(),
// }));

// describe("DatabaseContextProvider", () => {
//     const mockDb = {};
//     const mockDrizzle = drizzle as jest.Mock;
//     const mockUseMigrations = useMigrations as jest.Mock;
//     const mockGetAllUsers = getAllUsers as jest.Mock;
//     const mockCreateUser = createUser as jest.Mock;

//     beforeEach(() => {
//         mockDrizzle.mockReturnValue(mockDb);
//         mockUseMigrations.mockReturnValue({ success: true, error: null });
//         mockGetAllUsers.mockResolvedValue([]);
//         mockCreateUser.mockResolvedValue(1);
//         mockGetAllUsers.mockRejectedValue(new Error("Failed to fetch users"));
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     test("calls createUser directly", async () => {
//         mockCreateUser.mockResolvedValue(1);

//         await createUser(mockDb, { name: "default_user" });

//         expect(mockCreateUser).toHaveBeenCalledWith(mockDb, {
//             name: "default_user",
//         });
//     });

//     it("renders children when database and user initialization succeed", async () => {
//         render(
//             <DatabaseContextProvider>
//                 <Text testID="app-content">App Content</Text>
//             </DatabaseContextProvider>
//         );

//         await waitFor(() => {
//             expect(screen.getByTestId("app-content")).toBeTruthy();
//         });
//     });

//     it("creates a new user if no users exist in the database", async () => {
//         render(
//             <DatabaseContextProvider>
//                 <Text testID="app-content">App Content</Text>
//             </DatabaseContextProvider>
//         );

//         await waitFor(() => {
//             expect(mockGetAllUsers).toHaveBeenCalled(); // Ensure getAllUsers was called
//             expect(mockCreateUser).toHaveBeenCalledWith(mockDb, {
//                 name: "default_user",
//             });
//         });
//     });

//     it("uses the existing user if users exist in the database", async () => {
//         mockGetAllUsers.mockResolvedValue([{ id: 1, name: "existing_user" }]);

//         render(
//             <DatabaseContextProvider>
//                 <Text testID="app-content">App Content</Text>
//             </DatabaseContextProvider>
//         );

//         await waitFor(() => {
//             expect(mockGetAllUsers).toHaveBeenCalledWith(mockDb);
//             expect(screen.getByTestId("app-content")).toBeTruthy();
//         });
//     });

//     it("renders DatabaseCreationError if migrations fail", async () => {
//         mockUseMigrations.mockReturnValue({
//             success: false,
//             error: new Error("Migration failed"),
//         });

//         render(
//             <DatabaseContextProvider>
//                 <Text testID="app-content">App Content</Text>
//             </DatabaseContextProvider>
//         );

//         await waitFor(() => {
//             expect(screen.queryByTestId("app-content")).toBeNull();
//             expect(
//                 screen.getByText(/Error Creating the Database on Your Device/i)
//             ).toBeTruthy();
//         });
//     });

//     it("handles errors in user initialization gracefully", async () => {
//         mockGetAllUsers.mockRejectedValue(new Error("Failed to fetch users"));

//         render(
//             <FunctionalErrorBoundary>
//                 <DatabaseContextProvider>
//                     <Text testID="app-content">App Content</Text>
//                 </DatabaseContextProvider>
//             </FunctionalErrorBoundary>
//         );

//         await waitFor(() => {
//             expect(
//                 screen.queryByText(/Caught by FunctionalErrorBoundary:/i)
//             ).toBeTruthy();
//         });

//         expect(mockGetAllUsers).toHaveBeenCalledWith(mockDb);
//         expect(screen.queryByTestId("app-content")).toBeNull();
//     });
// });
