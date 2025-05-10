import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Colors from "../Config/Colors";

interface Props {
  title: string;
  selected: Boolean;
}

const MonthTile = ({ title, selected }: Props) => {
  return (
    <View
      style={[
        styles.container,
        selected && { backgroundColor: Colors.appPrimary },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(206, 201, 255, 0.08)",
    borderRadius: 6,
    padding: 8,
  },
  title: {
    color: "white",
    fontWeight: "500",
  },
});

export default MonthTile;
