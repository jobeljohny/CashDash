import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import AppBackground from "../Components/AppBackground";
import MonthsCarousel from "../Components/MonthsCarousel";
import PageHeader from "../Components/PageHeader";
import PaymentInfoTile from "../Components/PaymentInfoTile";
import { db, getExpensesByMonth } from "../Services/DbManager";
import { IPaymentInfo } from "../Interfaces/payment";

export default function ViewPayments() {
  const [payments, setPayments] = useState<IPaymentInfo[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial load for current month
  useEffect(() => {
    const now = new Date();
    fetchPaymentsByMonth(now.getFullYear(), now.getMonth());
  }, []);

  const fetchPaymentsByMonth = async (year: number, month: number) => {
    try {
      setLoading(true);
      const records = await getExpensesByMonth(db, year, month);

      // Transform database records to IPaymentInfo format
      const formattedRecords = records.map((record) => ({
        amount: record.amount,
        date: new Date(record.date),
        transactionType: record.transactionType,
        category: record.category,
        merchant: record.merchant,
      }));

      setPayments(formattedRecords);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthSelected = (year: number, month: number) => {
    fetchPaymentsByMonth(year, month);
  };

  const renderPaymentItem = ({ item }: { item: IPaymentInfo }) => (
    <PaymentInfoTile info={item} />
  );

  return (
    <AppBackground>
      <PageHeader
        text={"My Payments"}
        image={require("../Assets/icons/records.png")}
      />

      <View style={styles.carouselContainer}>
        <MonthsCarousel onMonthSelected={handleMonthSelected} />
      </View>

      <View style={styles.contentArea}>
        {loading ? (
          <Text style={styles.text}>Loading...</Text>
        ) : payments.length === 0 ? (
          <Text style={styles.text}>No payments found for this month</Text>
        ) : (
          <FlatList
            data={payments}
            renderItem={renderPaymentItem}
            keyExtractor={(item, index) =>
              `payment-${index}-${item.date.toISOString()}`
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {},
  contentArea: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    gap: 10,
    paddingBottom: 20,
  },
});
