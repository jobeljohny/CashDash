import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function PageHeader({ text, image }) {
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={image} />
      <Text style={styles.title}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: "rgba(206, 201, 255, 0.08)",
    borderRadius: 10,
    marginHorizontal: 10,
    gap: 12,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 20,
    color: "white",
  },
});
