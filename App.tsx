import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import React, { Suspense } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import * as schema from "./db/schema";
import AddPayment from "./Screens/AddPayment";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import ViewPayments from "./Screens/ViewPayments";

export const DATABASE_NAME = "cashdash";

export const dbInstance = (() => {
  const expoDb = openDatabaseSync(DATABASE_NAME);
  return drizzle<typeof schema>(expoDb, { schema });
})();

export default function App() {
  useDrizzleStudio(dbInstance, {
    enabled: __DEV__,
  });
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider databaseName={DATABASE_NAME} useSuspense>
        <ViewPayments></ViewPayments>
      </SQLiteProvider>
    </Suspense>
    // <AddPayment></AddPayment>
    //<HomeScreen></HomeScreen>
  );
}

const styles = StyleSheet.create({});
