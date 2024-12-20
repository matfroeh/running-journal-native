import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ItemEntity, User } from "@/types/modelTypes";
import DatabaseContextProvider from "@/context/DatabaseContextProvider";
import { useDatabase } from "@/context/DatabaseContext";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { itemsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useTheme } from "react-native-paper";
import { Surface, Text, TextInput } from "react-native-paper";
//#region Components

export default function App() {
    return (
        <DatabaseContextProvider>
            <Main />
        </DatabaseContextProvider>
    );
}

function Main() {
    const db = useDatabase();

    const { data } = useLiveQuery(db.select().from(itemsTable));

    const todoItems = data.filter((item) => !item.done);
    const doneItems = data.filter((item) => item.done);

    const [text, setText] = useState("");
    const theme = useTheme();

    return (
        // <View style={styles.container}>
        <View
            className="mt-0"
            style={[
                { backgroundColor: theme.colors.background },
                styles.container,
            ]}
        >
            <Text style={styles.heading}>SQLite Example</Text>

            <View style={styles.flexRow}>
                <TextInput
                    mode="outlined"
                    onChangeText={(text) => setText(text)}
                    onSubmitEditing={async () => {
                        await db.insert(itemsTable).values({
                            done: false,
                            value: text,
                        });
                        setText("");
                    }}
                    placeholder="what do you need to do?"
                    style={styles.input}
                    value={text}
                />
            </View>
            <ScrollView style={styles.listArea}>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeading}>Todo</Text>
                    {todoItems &&
                        todoItems.map((item) => (
                            <Item
                                key={item.id}
                                item={item}
                                onPressItem={async (id) => {
                                    await db
                                        .update(itemsTable)
                                        .set({ done: true })
                                        .where(eq(itemsTable.id, id));
                                }}
                            />
                        ))}
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeading}>Completed</Text>
                    {doneItems &&
                        doneItems.map((item) => (
                            <Item
                                key={item.id}
                                item={item}
                                onPressItem={async (id) => {
                                    await db
                                        .delete(itemsTable)
                                        .where(eq(itemsTable.id, id));
                                }}
                            />
                        ))}
                </View>
                {/* <View
                    className="flex-1 flex-row"
                    style={styles.sectionContainer}
                >
                    <TouchableOpacity
                        className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        onPress={async () => {
                            const res = await createUser(db, "fsm");
                            if (res.changes === 1) {
                                console.log("User created");
                            }
                        }}
                    >
                        <Text>Create User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        onPress={async () => {
                            const users = await getUsers(db);
                            setUser(users[0]);
                            // console.log(users);
                        }}
                    >
                        <Text>Get Users</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        onPress={async () => {
                            const res = await deleteUser(db, 1);
                            if (res.changes === 1) {
                                console.log("User deleted");
                            }
                        }}
                    >
                        <Text>Delete User id:1</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-1">
                    <TextInput
                        onChangeText={(text) => setUserName(text)}
                        onSubmitEditing={async () => {
                            if (user) {
                                const res = await updateUser(db, {
                                    ...user,
                                    name: userName,
                                });
                                if (res.changes === 1) {
                                    console.log("User updated");
                                    const updatedUser = await getUserById(
                                        db,
                                        user.id
                                    );
                                    updatedUser && setUser(updatedUser);
                                }
                            } else {
                                console.error("User is undefined");
                            }
                            setUserName("");
                        }}
                        placeholder="change user name"
                        style={styles.input}
                        value={userName}
                    />
                </View> */}
            </ScrollView>
        </View>
    );
}

function Item({
    item,
    onPressItem,
}: {
    item: ItemEntity;
    onPressItem: (id: any) => void | Promise<void>;
}) {
    const { id, done, value } = item;
    return (
        <TouchableOpacity
            onPress={() => onPressItem(id)}
            style={[styles.item, done && styles.itemDone]}
        >
            <Text style={[styles.itemText, done && styles.itemTextDone]}>
                {value}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 64,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    flexRow: {
        flexDirection: "row",
    },
    input: {
        // borderColor: "#4630eb",
        borderRadius: 4,
        borderWidth: 1,
        flex: 1,
        height: 48,
        margin: 16,
        padding: 8,
    },
    listArea: {
        flex: 1,
        paddingTop: 16,
    },
    sectionContainer: {
        marginBottom: 16,
        marginHorizontal: 16,
    },
    sectionHeading: {
        fontSize: 18,
        marginBottom: 8,
    },
    item: {
        // backgroundColor: "#fff",
        // borderColor: "#000",
        borderWidth: 1,
        padding: 8,
    },
    itemDone: {
        backgroundColor: "#1c9963",
    },
    itemText: {
        // color: "#000",
    },
    itemTextDone: {
        // color: "#fff",
    },
});

//#endregion

// import React, { useEffect, useState } from "react";
// import { View, Text, Button, FlatList, StyleSheet } from "react-native";
// import * as SQLite from "expo-sqlite";

// // Open or create a database asynchronously
// let db: SQLite.SQLiteDatabase;

// export default function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Initialize the database
//     const initializeDatabase = async () => {
//       try {
//         db = await SQLite.openDatabaseAsync("exampleTwo.db");
//         await db.execAsync(`
//           PRAGMA journal_mode = WAL;
//           CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT);
//           `);

//         fetchItems(); // Fetch initial data
//       } catch (error) {
//         console.error("Error initializing database:", error);
//       }
//     };

//     initializeDatabase();
//   }, []);

//   // Function to insert an item
//   const addItem = async () => {
//     try {
//       await db.runAsync("INSERT INTO items (value) VALUES (?);", [
//         `Item ${Math.floor(Math.random() * 100)}`,
//       ]);
//       fetchItems(); // Refresh data after insertion
//     } catch (error) {
//       console.error("Error inserting data:", error);
//     }
//   };

//   // Function to fetch all items
//   const fetchItems = async () => {
//     try {
//       const result = await db.getAllAsync("SELECT * FROM items;");
//       setData(result);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Function to clear all items
//   const clearItems = async () => {
//     try {
//       await db.runAsync("DELETE FROM items;");
//       setData([]); // Clear state after deletion
//     } catch (error) {
//       console.error("Error clearing data:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>SQLite Async Example</Text>
//       <Button title="Add Item" onPress={addItem} />
//       <Button title="Clear Items" onPress={clearItems} color="red" />
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <Text style={styles.item}>
//             {item.id}: {item.value}
//           </Text>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   item: {
//     fontSize: 18,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
// });
