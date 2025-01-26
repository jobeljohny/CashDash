import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

interface Props {
  title: string;
}

const MonthTile = ({ title }: Props) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
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
  },
});

export default MonthTile;
