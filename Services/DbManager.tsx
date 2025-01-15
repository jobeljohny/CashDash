import {
  openDatabase,
  enablePromise,
  SQLiteDatabase,
  SQLError,
} from "react-native-sqlite-storage";
import { IPaymentInfo } from "../Interfaces/payment";

const tableName = "expenses";
let dbConnection: SQLiteDatabase | null = null;

enablePromise(true);

export const getDBConnection = async () => {
  if (!dbConnection) {
    dbConnection = await openDatabase({
      name: "cashDash.db",
      location: "default",
    });
  }
  return dbConnection;
};
export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        date DATE NOT NULL,
        transactionType TEXT NOT NULL,
        category TEXT NOT NULL,
        merchant TEXT
    );`;

  await db.executeSql(query);
};

export const getExpenses = async (db: SQLiteDatabase) => {
  try {
    const expenses: IPaymentInfo[] = [];
    const [result] = await db.executeSql(
      `SELECT id, amount, date, transactionType, category, merchant FROM ${tableName}`
    );

    for (let i = 0; i < result.rows.length; i++) {
      expenses.push(result.rows.item(i));
    }

    return expenses;
  } catch (error: any) {
    console.error(`Failed to fetch expenses: ${error.message}`);
    throw new Error("Failed to get expenses");
  }
};

export const saveExpense = async (
  db: SQLiteDatabase,
  expenses: IPaymentInfo[]
) => {
  const insertQuery = `
    INSERT OR REPLACE INTO ${tableName} (id, amount, date, transactionType, category, merchant)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const promises = expenses.map((i) => {
    const params = [
      i.id || null,
      i.amount,
      i.date,
      i.transactionType,
      i.category,
      i.merchant,
    ];
    return db.executeSql(insertQuery, params);
  });

  await Promise.all(promises);
};
export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where id = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
