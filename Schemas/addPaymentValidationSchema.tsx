import * as Yup from "yup";
export const AddPaymentValidationSchema = Yup.object().shape({
  amount: Yup.number()
    .required()
    .positive("Amount should be positive")
    .label("Amount")
    .typeError("Amount is invalid"),
  date: Yup.date().required().label("Date"),
  transactionType: Yup.string().required(),
  category: Yup.string().required(),
  merchant: Yup.string().label("Merchant Name"),
});
