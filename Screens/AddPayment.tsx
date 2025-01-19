import React from "react";
import AppBackground from "../Components/AppBackground";
import PageHeader from "../Components/PageHeader";
import PaymentInfoForm from "../Components/PaymentInfoForm";
import { IPaymentInfo } from "../Interfaces/payment";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "../db/schema";
import { addExpense } from "../Services/DbManager";

export default function AddPayment() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const handleFormSubmit = async (values: IPaymentInfo) => {
    addExpense(db[0], values);
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
