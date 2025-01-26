import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { AsyncStorage } from "expo-sqlite/kv-store";
import { expenses } from "../db/schema";
import { IPaymentInfo } from "../Interfaces/payment";

type DBSchema = ExpoSQLiteDatabase<typeof import("../db/schema")>;

export const addExpense = async (db: DBSchema, expense: IPaymentInfo) => {
  try {
    const initialized = await AsyncStorage.getItem("dbInitialized");
    if (!initialized) {
      console.log("Initializing database...");
      await AsyncStorage.setItem("dbInitialized", "true");
    }

    const record = await db
      .insert(expenses)
      .values({
        amount: expense.amount,
        date: expense.date.toISOString(),
        transactionType: expense.transactionType,
        category: expense.category,
        merchant: expense.merchant,
      } as typeof expenses.$inferInsert)
      .returning();

    console.log("Record added:", record);
    return record;
  } catch (error) {
    console.error("Failed to add expense:", error);
    throw error;
  }
};

export const getAllRecords = async (db: DBSchema) => {
  try {
    const initialized = await AsyncStorage.getItem("dbInitialized");
    if (!initialized) {
      console.log("Initializing database...");
      await AsyncStorage.setItem("dbInitialized", "true");
    }
    const record = await db.query.expenses.findMany();

    console.log("records:", record);
    return record;
  } catch (error) {
    console.error("Failed to fetch records: ", error);
    throw error;
  }
};

///
