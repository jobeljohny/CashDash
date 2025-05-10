import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AppBackground from "../Components/AppBackground";
import PageHeader from "../Components/PageHeader";
import { db } from "../Services/DbManager";
import { PaymentRecord, expenses } from "../db/schema";
import { eq } from "drizzle-orm";

export default function DebugScreen() {
  const [expenseRecords, setExpenseRecords] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Load expenses when component mounts
  useEffect(() => {
    loadExpenses();
  }, []);

  // Fetch all expenses from the database
  const loadExpenses = async () => {
    setLoading(true);
    try {
      const records = await db.query.expenses.findMany();
      setExpenseRecords(records as PaymentRecord[]);
    } catch (error) {
      console.error("Failed to load expenses:", error);
      Alert.alert("Error", "Failed to load expenses from database");
    } finally {
      setLoading(false);
    }
  };

  // Clear all expenses from the database
  const clearExpenses = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete ALL expenses? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            try {
              // Delete all records
              await db.delete(expenses);
              Alert.alert("Success", "All expenses have been deleted");
              loadExpenses(); // Refresh the list
            } catch (error) {
              console.error("Failed to clear expenses:", error);
              Alert.alert("Error", "Failed to clear expenses");
            }
          },
        },
      ]
    );
  };

  // Format date string for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  // Render each expense item
  const renderExpenseItem = ({ item }: { item: PaymentRecord }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, styles.idCell]}>{item.id}</Text>
      <Text style={[styles.cell, styles.amountCell]}>${item.amount}</Text>
      <Text style={[styles.cell, styles.dateCell]}>
        {formatDate(item.date)}
      </Text>
      <Text style={[styles.cell, styles.typeCell]}>{item.transactionType}</Text>
      <Text style={[styles.cell, styles.categoryCell]}>{item.category}</Text>
      <Text style={[styles.cell, styles.merchantCell]}>
        {item.merchant || "-"}
      </Text>
    </View>
  );

  return (
    <AppBackground>
      <PageHeader
        text="Database Debug"
        image={require("../Assets/icons/records.png")}
      />

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={loadExpenses}>
            <Text style={styles.buttonText}>Refresh Data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.dangerButton]}
            onPress={clearExpenses}
          >
            <Text style={styles.buttonText}>Clear All Data</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>
          Expenses Table ({expenseRecords.length} records)
        </Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : expenseRecords.length === 0 ? (
          <Text style={styles.emptyText}>No expenses found in database</Text>
        ) : (
          <ScrollView horizontal>
            <View>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, styles.idCell]}>ID</Text>
                <Text style={[styles.headerCell, styles.amountCell]}>
                  Amount
                </Text>
                <Text style={[styles.headerCell, styles.dateCell]}>Date</Text>
                <Text style={[styles.headerCell, styles.typeCell]}>Type</Text>
                <Text style={[styles.headerCell, styles.categoryCell]}>
                  Category
                </Text>
                <Text style={[styles.headerCell, styles.merchantCell]}>
                  Merchant
                </Text>
              </View>

              {/* Table Body */}
              <FlatList
                data={expenseRecords}
                renderItem={renderExpenseItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.table}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2c6e49",
    padding: 12,
    borderRadius: 8,
    minWidth: 150,
    alignItems: "center",
  },
  dangerButton: {
    backgroundColor: "#d62828",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  loadingText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  table: {
    maxHeight: 500,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#132238",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  headerCell: {
    padding: 10,
    fontWeight: "bold",
    color: "white",
  },
  cell: {
    padding: 10,
    color: "white",
  },
  idCell: {
    width: 50,
  },
  amountCell: {
    width: 100,
  },
  dateCell: {
    width: 100,
  },
  typeCell: {
    width: 120,
  },
  categoryCell: {
    width: 120,
  },
  merchantCell: {
    width: 120,
  },
});
