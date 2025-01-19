import React from "react";
import AppBackground from "../Components/AppBackground";
import PageHeader from "../Components/PageHeader";
import PaymentInfoForm from "../Components/PaymentInfoForm";
import { IPaymentInfo } from "../Interfaces/payment";
import { createTable, saveExpense } from "../Services/DbManager";

export default function AddPayment() {
  const handleFormSubmit = async (values: IPaymentInfo) => {
    console.log(values);
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
