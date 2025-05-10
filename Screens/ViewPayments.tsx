import { StyleSheet, Text, View } from "react-native";
import AppBackground from "../Components/AppBackground";
import MonthsCarousel from "../Components/MonthsCarousel";
import PageHeader from "../Components/PageHeader";

export default function ViewPayments() {
  return (
    <AppBackground>
      <PageHeader
        text={"My Payments"}
        image={require("../Assets/icons/records.png")}
      />
      <View style={styles.container}>
        <MonthsCarousel></MonthsCarousel>
        <Text>hellow</Text>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
