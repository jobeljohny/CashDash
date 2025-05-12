import { Picker, PickerProps } from "@react-native-picker/picker";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Colors from "../../Config/Colors";
type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface Props extends PickerProps {
  icon: IconName;
  items: string[];
  selectedValue?: string;
}

const PickerInput: React.FC<Props> = ({
  icon,
  items,
  selectedValue,
  ...otherProps
}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        style={styles.icon}
        name={icon}
        size={20}
        color={Colors.appPrimary}
      />
      <Picker
        mode="dropdown"
        style={styles.picker}
        selectedValue={selectedValue || items[0]}
        dropdownIconColor="grey"
        {...otherProps}
      >
        {items.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
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
  },
  picker: {
    color: "white",
    flex: 1,
  },
  pickerItem: {
    backgroundColor: "red",
  },
});

export default PickerInput;
