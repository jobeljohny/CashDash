import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PickerInput from "./PickerInput";
import Colors from "../../Config/Colors";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface Props {
  items: string[];
  icon: IconName;
  changeVariable: string;
  floatingLabel: string;
}

const FormPicker: React.FC<Props> = ({
  items,
  icon,
  floatingLabel,
  changeVariable,
}) => {
  const { handleChange } = useFormikContext();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{floatingLabel}</Text>
      <PickerInput
        icon={icon}
        items={items}
        onValueChange={() => handleChange(changeVariable)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  label: {
    color: Colors.appPrimary,
    fontSize: 12,
    marginLeft: 2,
    marginBottom: 2,
  },
});

export default FormPicker;
