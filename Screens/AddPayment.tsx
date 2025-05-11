import React from "react";
import AppBackground from "../Components/AppBackground";
import PageHeader from "../Components/PageHeader";
import PaymentInfoForm from "../Components/PaymentInfoForm";
import { IPaymentInfo } from "../Interfaces/payment";
import { addExpense, db } from "../Services/DbManager";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type AddPaymentNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddPayment"
>;

export default function AddPayment() {
  const navigation = useNavigation<AddPaymentNavigationProp>();

  const handleFormSubmit = async (values: IPaymentInfo) => {
    try {
      const record = await addExpense(db, values);
      console.log("Expense recorded successfully:", record);
      // Navigate back to ViewPayments after successful submission
      navigation.navigate("ViewPayments");
    } catch (error) {
      console.error("Error while adding expense:", error);
    }
  };

  return (
    <AppBackground>
      <PageHeader
        text={"Record Payment"}
        image={require("../Assets/icons/card.png")}
      />
      <PaymentInfoForm onSubmit={handleFormSubmit} />
    </AppBackground>
  );
}
