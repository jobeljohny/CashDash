import React, { useEffect, useRef } from "react";
import { FlatList, Text } from "react-native";
import MonthTile from "./MonthTile";
import { generateMonthList } from "../Services/Generators";

const MonthsCarousel = () => {
  const flatListRef = useRef<FlatList>(null);
  const monthList = generateMonthList();

  useEffect(() => {
    // Scroll to the last item after the component is mounted
    flatListRef.current?.scrollToIndex({
      index: monthList.length - 1,
      animated: true,
    });
  }, [monthList]);

  return (
    <FlatList
      ref={flatListRef}
      style={{ margin: 10 }}
      data={monthList}
      renderItem={({ item }) => <MonthTile title={item.monthDisplay} />}
      keyExtractor={(item) => item.month.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
      onScrollToIndexFailed={(error) => {
        console.warn("Scroll to index failed", error);
        flatListRef.current?.scrollToEnd({ animated: true });
      }}
    />
  );
};

export default MonthsCarousel;
