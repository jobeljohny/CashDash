import { StyleSheet, Text, View } from "react-native";
import AppBackground from "../Components/AppBackground";
import MonthsCarousel from "../Components/MonthsCarousel";
import PageHeader from "../Components/PageHeader";
import PaymentInfoTile from "../Components/PaymentInfoTile";

export default function ViewPayments() {
  return (
    <AppBackground>
      <PageHeader
        text={"My Payments"}
        image={require("../Assets/icons/records.png")}
      />

      <View style={styles.carouselContainer}>
        <MonthsCarousel />
      </View>

      <View style={styles.contentArea}>
        <PaymentInfoTile
          info={{
            amount: 100,
            date: new Date(),
            transactionType: "credit",
            category: "food",
            merchant: "McDonald's",
          }}
        />
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
  },
});
