import { SQLiteProvider } from "expo-sqlite";
import React, { Suspense, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import * as schema from "./db/schema";
import AddPayment from "./Screens/AddPayment";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import ViewPayments from "./Screens/ViewPayments";
import { DATABASE_NAME, db } from "./Services/DbManager";
import DebugScreen from "./Screens/DebugScreen";
import HomeScreen from "./Screens/HomeScreen";

export default function App() {
  const [showDebug, setShowDebug] = useState(false);

  useDrizzleStudio(db, {
    enabled: __DEV__,
  });

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider databaseName={DATABASE_NAME} useSuspense>
        {showDebug ? <DebugScreen /> : <ViewPayments />}

        {/* Floating Debug Button */}
        <TouchableOpacity
          style={styles.debugButton}
          onPress={() => setShowDebug(!showDebug)}
        >
          <Text style={styles.debugButtonText}>
            {showDebug ? "Close" : "Debug"}
          </Text>
        </TouchableOpacity>
      </SQLiteProvider>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  debugButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#132238",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  debugButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
