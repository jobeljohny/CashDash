export interface IPaymentInfo {
  id?: number;
  amount: number;
  date: Date;
  transactionType: string;
  category: string;
  merchant?: string;
}

export interface IPaymentInfoSerialized {
  id?: number;
  amount: number;
  date: string;
  transactionType: string;
  category: string;
  merchant?: string;
}
