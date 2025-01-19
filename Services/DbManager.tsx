import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { IPaymentInfo } from "../Interfaces/payment";
import { AsyncStorage } from "expo-sqlite/kv-store";
import { expenses, PaymentRecord } from "../db/schema";

export const addExpense = async (
  db: ExpoSQLiteDatabase,
  expense: IPaymentInfo
) => {
  const value = AsyncStorage.getItemAsync("dbInitialized");
  console.log(value);

  if (value) return;

  const record = await db
    .insert(expenses)
    .values({
      amount: expense.amount,
      date: expense.date.toISOString(),
      transactionType: expense.category,
      category: expense.category,
      merchant: expense.merchant,
    } as typeof expenses.$inferInsert)
    .returning();

  console.log(record);
};
