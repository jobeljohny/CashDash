//date , amount , UPI(type), Category, Merchant(optional)
import { Formik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import AppBackground from "../Components/AppBackground";
import { AppFormField, FormInput, FormSubmitButton } from "../Components/Forms";
import PageHeader from "../Components/PageHeader";

const validationSchema = Yup.object().shape({
  amount: Yup.number().required().positive().label("Amount "),
  date: Yup.date().required().label("Date"),
  transactionType: Yup.string().required(),
  category: Yup.string().required(),
  merchant: Yup.string().label("Merchant Name"),
});

export default function AddPayment() {
  return (
    <AppBackground>
      <PageHeader
        text={"Record Payment"}
        image={require("../Assets/icons/card.png")}
      />

      <View style={{ margin: 10 }}>
        <Formik
          initialValues={{
            amount: 0,
            date: new Date(),
            transactionType: "UPI",
            category: "Food",
            merchant: "",
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          {({ handleChange }) => (
            <>
              <AppFormField
                name="amount"
                keyboardType="decimal-pad"
                icon="currency-rupee"
                placeholder="Amount"
              />
              <FormInput
                icon="wallet-outline"
                placeholder="Payment mode"
                onChangeText={handleChange("transactionType")}
              />
              <FormInput
                icon="view-grid-outline"
                placeholder="Category"
                onChangeText={handleChange("category")}
              />
              <FormInput
                icon="calendar"
                placeholder="Date"
                onChangeText={handleChange("date")}
              />

              <FormInput
                icon="warehouse"
                placeholder="Merchant (optional)"
                onChangeText={handleChange("merchant")}
              />
              <FormSubmitButton title="Submit"></FormSubmitButton>
            </>
          )}
        </Formik>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({});
