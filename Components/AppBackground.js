import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Platform, StatusBar, View } from "react-native";

export default function AppBackground({ children }) {
  const statusBarHeight =
    Platform.OS === "ios" ? 0 : StatusBar.currentHeight || 0;
  return (
    <LinearGradient
      colors={["#192438", "#1d6b47"]}
      locations={[0.5, 1]}
      style={styles.container}
    >
      <View style={[styles.content, { paddingTop: statusBarHeight }]}>
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
