import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { AsyncStorage } from "expo-sqlite/kv-store";
import { expenses } from "../db/schema";
import { IPaymentInfo } from "../Interfaces/payment";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "../db/schema";
import migrations from "../drizzle/migrations";
import { eq } from "drizzle-orm";

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

export const updateExpense = async (db: DBSchema, expense: IPaymentInfo) => {
  try {
    const record = await db
      .update(expenses)
      .set({
        amount: expense.amount,
        date: expense.date.toISOString(),
        transactionType: expense.transactionType,
        category: expense.category,
        merchant: expense.merchant,
      } as typeof expenses.$inferInsert)
      .where(eq(expenses.id, expense.id))
      .returning();

    console.log("Record updated:", record);
    return record;
  } catch (error) {
    console.error("Failed to update expense:", error);
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

export const getExpensesByMonth = async (
  db: DBSchema,
  year: number,
  month: number
) => {
  try {
    // Create date range for the specified month
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0); // Last day of the month

    const startDateStr = startDate.toISOString();
    const endDateStr = endDate.toISOString();

    const records = await db.query.expenses.findMany({
      where: (expenses, { and, gte, lte }) =>
        and(gte(expenses.date, startDateStr), lte(expenses.date, endDateStr)),
    });

    return records;
  } catch (error) {
    console.error("Failed to fetch expenses by month:", error);
    throw error;
  }
};

///

// Database name
export const DATABASE_NAME = "cashdash";

// Initialize and migrate database
export const initializeDatabase = () => {
  const expoDb = openDatabaseSync(DATABASE_NAME);

  // Apply migrations - safely handling existing tables
  try {
    const migrationValues = Object.values(migrations.migrations);
    migrationValues.forEach((migration) => {
      try {
        expoDb.execSync(migration);
      } catch (error) {
        // Ignore "table already exists" errors
        if (!error.toString().includes("already exists")) {
          console.error("Migration error:", error);
        }
      }
    });
  } catch (error) {
    console.error("Migration process error:", error);
  }

  // Return drizzle instance
  return drizzle<typeof schema>(expoDb, { schema });
};

// Export db instance
export const db = initializeDatabase();
