import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../Config/Colors";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface Props {
  icon: IconName;
  date: Date;
  onChange: (event: DateTimePickerEvent, date: Date | undefined) => {};
}

const DateInput: React.FC<Props> = ({
  icon,
  date,
  onChange,
  ...otherProps
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    setShowPicker(false); // Close the picker when a date is selected
    if (selectedDate) {
      onChange(event, selectedDate);
    }
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB").format(date);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        style={styles.icon}
        name={icon}
        size={20}
        color={Colors.appPrimary}
      />
      <Text style={styles.dateText} onPress={() => setShowPicker(true)}>
        {formattedDate} {/* Display the selected date */}
      </Text>
      {showPicker && (
        <RNDateTimePicker
          mode="date"
          value={date}
          accentColor="green"
          onChange={handleDateChange}
          {...otherProps}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(206, 201, 255, 0.08)",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    height: 50,
  },
  icon: {
    marginLeft: 14,
    marginRight: 14,
  },
  dateText: {
    color: "white",
    flex: 1,
  },
});

export default DateInput;
