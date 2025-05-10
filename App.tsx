import { SQLiteProvider } from "expo-sqlite";
import React, { Suspense } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import * as schema from "./db/schema";
import AddPayment from "./Screens/AddPayment";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import ViewPayments from "./Screens/ViewPayments";
import { DATABASE_NAME, db } from "./Services/DbManager";

export default function App() {
  useDrizzleStudio(db, {
    enabled: __DEV__,
  });
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider databaseName={DATABASE_NAME} useSuspense>
        <AddPayment></AddPayment>
      </SQLiteProvider>
    </Suspense>
    // <AddPayment></AddPayment>
    //<HomeScreen></HomeScreen>
  );
}

const styles = StyleSheet.create({});
