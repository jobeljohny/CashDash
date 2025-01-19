import React, { Suspense } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import AddPayment from "./Screens/AddPayment";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "./drizzle/migrations";

export const DATABASE_NAME = "cashdash";

export default function App() {
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider databaseName={DATABASE_NAME} useSuspense>
        <AddPayment></AddPayment>
      </SQLiteProvider>
    </Suspense>
    //<HomeScreen></HomeScreen>
  );
}

const styles = StyleSheet.create({});
