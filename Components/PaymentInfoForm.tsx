import { Formik } from "formik";
import React from "react";
import { category, paymentModes } from "../Constants/PaymentFields";
import { AddPaymentValidationSchema } from "../Schemas/addPaymentValidationSchema";
import { StyleSheet, View } from "react-native";
import { AppFormField, FormPicker, FormSubmitButton } from "./Forms";
import { IPaymentInfo } from "../Interfaces/payment";
import FormDatePicker from "./Forms/FormDatePicker";

interface Props {
  onSubmit: (info: IPaymentInfo) => void;
}

//some import issue was there. couldn't test
const PaymentInfoForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        amount: 0,
        date: new Date(),
        transactionType: paymentModes[0],
        category: category[0],
        merchant: "",
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={AddPaymentValidationSchema}
    >
      {({ values }) => (
        <>
          <View style={styles.formContainer}>
            <View style={styles.dualField}>
              <View style={styles.fieldContainer}>
                <AppFormField
                  name="amount"
                  keyboardType="decimal-pad"
                  icon="currency-rupee"
                  placeholder="Amount"
                  floatingLabel="Amount"
                  changeVariable="amount"
                />
              </View>
              <View style={styles.fieldContainer}>
                <FormPicker
                  items={paymentModes}
                  icon="wallet-outline"
                  changeVariable="transactionType"
                  floatingLabel="Payment Mode"
                />
              </View>
            </View>

            <View style={styles.dualField}>
              <View style={styles.fieldContainer}>
                <FormPicker
                  items={category}
                  icon="view-grid-outline"
                  changeVariable="category"
                  floatingLabel="Category"
                />
              </View>
              <View style={styles.fieldContainer}>
                <FormDatePicker
                  icon="calendar"
                  floatingLabel="Date"
                  date={values.date}
                  changeVariable="date"
                />
              </View>
            </View>

            <AppFormField
              name="merchant"
              icon="warehouse"
              floatingLabel="Merchant"
              placeholder="Merchant (optional)"
              changeVariable="merchant"
            />

            <FormSubmitButton title="SUBMIT"></FormSubmitButton>
          </View>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "column",
    gap: 30,
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  dualField: {
    flexDirection: "row",
    gap: 16,
  },
  fieldContainer: {
    flex: 1,
  },
});

export default PaymentInfoForm;
