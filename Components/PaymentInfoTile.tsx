import { Image, StyleSheet, Text, View } from "react-native";
import { paymentCategoryMap } from "../Constants/paymentCategoryMap";
import { IPaymentInfo } from "../Interfaces/payment";
import SwipeableTile from "./SwipeableTile";

interface Props {
  info: IPaymentInfo;
  onDelete?: (payment: IPaymentInfo) => void;
  onEdit?: (payment: IPaymentInfo) => void;
}

export default function PaymentInfoTile({ info, onDelete, onEdit }: Props) {
  return (
    <SwipeableTile
      onDelete={() => {
        if (onDelete) onDelete(info);
      }}
      onEdit={() => {
        if (onEdit) onEdit(info);
      }}
    >
      <View style={styles.container}>
        <View style={styles.categoryContainer}>
          <Image
            source={paymentCategoryMap.Food}
            style={styles.categoryImage}
          />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.paymentTitleContainer}>
            <Text style={styles.paymentCategory}>{info.category}</Text>
            {info.merchant && (
              <Text style={styles.paymentMerchant}> - {info.merchant}</Text>
            )}
          </View>
          <View style={styles.paymentDateContainer}>
            <Text style={styles.paymentDate}>
              {info.date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>- ₹{info.amount}</Text>
        </View>
      </View>
    </SwipeableTile>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(206, 201, 255, 0.08)",
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 60,
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
    color: "white",
  },
  categoryContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "rgba(255, 255, 255, 0.15)",
    borderRightWidth: 0.5,
    height: 40,
    paddingRight: 12,
    paddingLeft: 8,
    marginRight: 16,
  },
  categoryImage: {
    width: 24,
    height: 24,
  },
  paymentTitleContainer: {
    flexDirection: "row",
  },
  paymentCategory: {
    fontSize: 16,
    color: "white",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  paymentMerchant: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.5)",
  },
  paymentDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentDate: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  amount: {
    fontSize: 20,
    color: "#ff6347",
  },
});
