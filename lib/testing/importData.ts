import { DatabaseType } from "@/types/dbType";
import {
    journalsTable,
    equipmentTable,
    runsEquipmentTable,
    runsTable,
    scheduledWorkoutsTable,
    usersTable,
} from "@/db/schema";
import {
    users,
    equipment,
    journals,
    runs,
    runsEquipmentMapping,
    scheduledWorkouts,
} from "@/assets/testData";
export const importTestData = async (db: DatabaseType) => {
    try {
        // Clear the default user that is created at the DatabaseProvider layer
        await db.delete(usersTable);

        await db.insert(usersTable).values(users);
        await db.insert(equipmentTable).values(equipment);
        await db.insert(journalsTable).values(journals);
        await db.insert(runsTable).values(runs);
        await db.insert(runsEquipmentTable).values(runsEquipmentMapping);
        await db.insert(scheduledWorkoutsTable).values(scheduledWorkouts);
    } catch (error) {
        console.error("Error importing test data", error);
    }
};
