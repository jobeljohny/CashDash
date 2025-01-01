import { openDatabase, enablePromise } from "react-native-sqlite-storage";

const tableName = 'expenses';

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase({ name: 'cashDash.db', location: 'default' });
};

export const createTable = async (db) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE NOT NULL,
        expense TEXT NOT NULL,
        category TEXT NOT NULL,
        amount REAL NOT NULL,
    );`;

    await db.executeSql(query);
};

export const getExpenses = async (db) => {
    try {
        const expenses = [];
        const results = await db.executeSql(`SELECT id,date,expense,category,amount FROM ${tableName}`);
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                expenses.push(result.rows.item(index))
            }
        });
        return results;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get expenses !!!');
    }
};

export const saveExpense = async (db, expenses) => {
    const insertQuery =
        `INSERT OR REPLACE INTO ${tableName}(id,date,expense,category,amount) values` +
        expenses.map(i => `(${i.id || 'NULL'}, (${i.date}, '${i.expense}', '${i.category}', '${i.amount}')`).join(',');

    return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (db, id) => {
    const deleteQuery = `DELETE from ${tableName} where id = ${id}`;
    await db.executeSql(deleteQuery);
};

export const deleteTable = async (db) => {
    const query = `drop table ${tableName}`;

    await db.executeSql(query);
};