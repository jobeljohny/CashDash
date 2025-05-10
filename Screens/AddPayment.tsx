import React from "react";
import AppBackground from "../Components/AppBackground";
import PageHeader from "../Components/PageHeader";
import PaymentInfoForm from "../Components/PaymentInfoForm";
import { IPaymentInfo } from "../Interfaces/payment";
import { addExpense, db } from "../Services/DbManager";

export default function AddPayment() {
  const handleFormSubmit = async (values: IPaymentInfo) => {
    try {
      const record = await addExpense(db, values);
      console.log("Expense recorded successfully:", record);
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
