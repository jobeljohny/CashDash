//date , amount , UPI(type), Category,
import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppBackground from "../Components/AppBackground";
import PageHeader from "../Components/PageHeader";

export default function AddPayment() {
  return (
    <AppBackground>
      <PageHeader
        text={"Record Payment"}
        image={require("../Assets/icons/card.png")}
      />
    </AppBackground>
  );
}

const styles = StyleSheet.create({});
