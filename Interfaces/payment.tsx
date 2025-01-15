export interface IPaymentInfo {
  id?: number;
  amount: number;
  date: Date;
  transactionType: string;
  category: string;
  merchant: string;
}
