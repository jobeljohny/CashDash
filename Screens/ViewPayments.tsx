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
      <MonthsCarousel></MonthsCarousel>
    </AppBackground>
  );
}
