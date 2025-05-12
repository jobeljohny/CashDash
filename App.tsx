import "react-native-gesture-handler";

import { SQLiteProvider } from "expo-sqlite";
import React, { Suspense, useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as schema from "./db/schema";
import AddPayment from "./Screens/AddPayment";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import ViewPayments from "./Screens/ViewPayments";
import { DATABASE_NAME, db } from "./Services/DbManager";
import DebugScreen from "./Screens/DebugScreen";
import HomeScreen from "./Screens/HomeScreen";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Define the type for stack navigator
export type RootStackParamList = {
  ViewPayments: undefined;
  DebugScreen: undefined;
  AddPayment: undefined;
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // Reference to the navigation container with proper typing
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);

  useDrizzleStudio(db, {
    enabled: __DEV__,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <NavigationContainer ref={navigationRef}>
          <SQLiteProvider databaseName={DATABASE_NAME} useSuspense>
            <Stack.Navigator
              id={undefined}
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="ViewPayments" component={ViewPayments} />
              <Stack.Screen name="DebugScreen" component={DebugScreen} />
              <Stack.Screen name="AddPayment" component={AddPayment} />
            </Stack.Navigator>

            {/* Floating Debug Button */}
            <TouchableOpacity
              style={styles.debugButton}
              onPress={() => {
                const currentRoute =
                  navigationRef.current?.getCurrentRoute()?.name;
                if (currentRoute === "DebugScreen") {
                  navigationRef.current?.navigate("ViewPayments");
                } else {
                  navigationRef.current?.navigate("DebugScreen");
                }
              }}
            >
              <Text style={styles.debugButtonText}>
                {navigationRef.current?.getCurrentRoute()?.name ===
                "DebugScreen"
                  ? "Close"
                  : "Debug"}
              </Text>
            </TouchableOpacity>
          </SQLiteProvider>
        </NavigationContainer>
      </Suspense>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  debugButton: {
    position: "absolute",
    right: 20,
    bottom: 40,
    backgroundColor: "#132238",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  debugButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
