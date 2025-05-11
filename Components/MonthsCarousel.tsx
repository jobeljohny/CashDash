import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import MonthTile from "./MonthTile";
import { generateMonthList } from "../Services/Generators";

interface MonthsCarouselProps {
  onMonthSelected?: (year: number, month: number) => void;
}

const MonthsCarousel = ({ onMonthSelected }: MonthsCarouselProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [monthList, setMonthList] = useState(generateMonthList());
  const [selectedIndex, setSelectedIndex] = useState(monthList.length - 1);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: selectedIndex,
        animated: true,
      });
    }, 100);

    // Notify parent of initial selected month
    if (onMonthSelected && monthList[selectedIndex]) {
      const selectedDate = monthList[selectedIndex].month;
      onMonthSelected(selectedDate.getFullYear(), selectedDate.getMonth());
    }
  }, [monthList]);

  const onTileClick = (i: number) => {
    const updatedMonthList = monthList.map((item, index) => ({
      ...item,
      selected: index === i,
    }));
    setSelectedIndex(i);
    setMonthList(updatedMonthList);

    // Notify parent of selected month
    if (onMonthSelected && updatedMonthList[i]) {
      const selectedDate = updatedMonthList[i].month;
      onMonthSelected(selectedDate.getFullYear(), selectedDate.getMonth());
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={monthList}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onTileClick(index)}>
            <MonthTile title={item.monthDisplay} selected={item.selected} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) =>
          `${item.month.getFullYear()}-${item.month.getMonth()}`
        }
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
        onScrollToIndexFailed={(error) => {
          console.warn("Scroll to index failed", error);
          flatListRef.current?.scrollToEnd({ animated: true }); // Fallback to scroll to end
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 36,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default MonthsCarousel;
