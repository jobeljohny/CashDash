import React from "react";
import AppBackground from "../Components/AppBackground";
import PageHeader from "../Components/PageHeader";
import PaymentInfoForm from "../Components/PaymentInfoForm";
import { IPaymentInfo } from "../Interfaces/payment";
import { addExpense, db, updateExpense } from "../Services/DbManager";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { AddPaymentNavigationProp } from "../Constants/NavigationProps";

type AddPaymentRouteProp = RouteProp<RootStackParamList, "AddPayment">;

export default function AddPayment() {
  const navigation = useNavigation<AddPaymentNavigationProp>();
  const route = useRoute<AddPaymentRouteProp>();
  const routeParams = route.params || {};

  // Convert date string back to Date object if a payment was passed
  const payment = routeParams.payment
    ? {
        ...routeParams.payment,
        date: new Date(routeParams.payment.date),
      }
    : undefined;

  const { isEdit } = routeParams;

  const handleFormSubmit = async (values: IPaymentInfo) => {
    try {
      if (isEdit) {
        const record = await updateExpense(db, values);
        console.log("Expense updated successfully:", record);
      } else {
        const record = await addExpense(db, values);
        console.log("Expense recorded successfully:", record);
      }
      // Navigate back to ViewPayments after successful submission
      navigation.navigate("ViewPayments");
    } catch (error) {
      console.error("Error while adding/editing expense:", error);
    }
  };

  return (
    <AppBackground>
      <PageHeader
        text={isEdit ? "Update Payment" : "Record Payment"}
        image={
          isEdit
            ? require("../Assets/icons/edit.png")
            : require("../Assets/icons/card.png")
        }
      />
      <PaymentInfoForm onSubmit={handleFormSubmit} payment={payment} />
    </AppBackground>
  );
}
