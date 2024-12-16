import { useState, useEffect, useCallback } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    SQLiteProvider,
    useSQLiteContext,
    type SQLiteDatabase,
} from "expo-sqlite";

/**
 * The Item type represents a single item in database.
 */
interface ItemEntity {
    id: number;
    done: boolean;
    value: string;
}

//#region Components

export default function App() {
    return (
        <SQLiteProvider databaseName="db.db" onInit={migrateDbIfNeeded}>
            <Main />
        </SQLiteProvider>
    );
}

function Main() {
    const db = useSQLiteContext();
    const [text, setText] = useState("");
    const [todoItems, setTodoItems] = useState<ItemEntity[]>([]);
    const [doneItems, setDoneItems] = useState<ItemEntity[]>([]);

    const refetchItems = useCallback(() => {
        async function refetch() {
            await db.withExclusiveTransactionAsync(async () => {
                setTodoItems(
                    await db.getAllAsync<ItemEntity>(
                        "SELECT * FROM items WHERE done = ?",
                        false
                    )
                );
                setDoneItems(
                    await db.getAllAsync<ItemEntity>(
                        "SELECT * FROM items WHERE done = ?",
                        true
                    )
                );
            });
        }
        refetch();
    }, [db]);

    useEffect(() => {
        refetchItems();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>SQLite Example</Text>

            <View style={styles.flexRow}>
                <TextInput
                    onChangeText={(text) => setText(text)}
                    onSubmitEditing={async () => {
                        await addItemAsync(db, text);
                        await refetchItems();
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
                    {todoItems.map((item) => (
                        <Item
                            key={item.id}
                            item={item}
                            onPressItem={async (id) => {
                                await updateItemAsDoneAsync(db, id);
                                await refetchItems();
                            }}
                        />
                    ))}
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeading}>Completed</Text>
                    {doneItems.map((item) => (
                        <Item
                            key={item.id}
                            item={item}
                            onPressItem={async (id) => {
                                await deleteItemAsync(db, id);
                                await refetchItems();
                            }}
                        />
                    ))}
                </View>
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
            onPress={() => onPressItem && onPressItem(id)}
            style={[styles.item, done && styles.itemDone]}
        >
            <Text style={[styles.itemText, done && styles.itemTextDone]}>
                {value}
            </Text>
        </TouchableOpacity>
    );
}

//#endregion

//#region DB Operations

async function addItemAsync(db: SQLiteDatabase, text: string): Promise<void> {
    if (text !== "") {
        await db.runAsync(
            "INSERT INTO items (done, value) VALUES (?, ?);",
            false,
            text
        );
    }
}

async function updateItemAsDoneAsync(
    db: SQLiteDatabase,
    id: number
): Promise<void> {
    await db.runAsync("UPDATE items SET done = ? WHERE id = ?;", true, id);
}

async function deleteItemAsync(db: SQLiteDatabase, id: number): Promise<void> {
    await db.runAsync("DELETE FROM items WHERE id = ?;", id);
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    let result = await db.getFirstAsync<{ user_version: number }>(
        "PRAGMA user_version"
    );
    let currentDbVersion = result ? result.user_version : 0;
    if (currentDbVersion >= DATABASE_VERSION) {
        return;
    }
    if (currentDbVersion === 0) {
        await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY NOT NULL, done INT, value TEXT);
`);
        currentDbVersion = 1;
    }
    // if (currentDbVersion === 1) {
    //   Add more migrations
    // }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

//#endregion

//#region Styles

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
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
        borderColor: "#4630eb",
        borderRadius: 4,
        borderWidth: 1,
        flex: 1,
        height: 48,
        margin: 16,
        padding: 8,
    },
    listArea: {
        backgroundColor: "#f0f0f0",
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
        backgroundColor: "#fff",
        borderColor: "#000",
        borderWidth: 1,
        padding: 8,
    },
    itemDone: {
        backgroundColor: "#1c9963",
    },
    itemText: {
        color: "#000",
    },
    itemTextDone: {
        color: "#fff",
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
