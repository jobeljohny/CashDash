//date , amount , UPI(type), Category, Merchant(optional)
import React from "react";
import AppBackground from "../Components/AppBackground";
import PageHeader from "../Components/PageHeader";
import PaymentInfoForm from "../Components/PaymentInfoForm";

export default function AddPayment() {
  return (
    <AppBackground>
      <PageHeader
        text={"Record Payment"}
        image={require("../Assets/icons/card.png")}
      />
      <PaymentInfoForm
        onSubmit={(values) => {
          console.log("submit logic here");
          console.log(values);
        }}
      />
    </AppBackground>
  );
}
