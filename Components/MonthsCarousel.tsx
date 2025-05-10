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

const MonthsCarousel = () => {
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
  }, [monthList]);

  const onTileClick = (i: number) => {
    const updatedMonthList = monthList.map((item, index) => ({
      ...item,
      selected: index === i,
    }));
    setSelectedIndex(i);
    setMonthList(updatedMonthList);
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
        keyExtractor={(item) => item.month.toString()}
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
