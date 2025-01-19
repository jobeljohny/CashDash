import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PickerInput from "./PickerInput";
import Colors from "../../Config/Colors";
import DateInput from "./DateInput";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface Props {
  icon: IconName;
  changeVariable: string;
  floatingLabel: string;
  date: Date;
}

const FormDatePicker: React.FC<Props> = ({
  icon,
  floatingLabel,
  date,
  changeVariable,
}) => {
  const { setFieldValue } = useFormikContext();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{floatingLabel}</Text>
      <DateInput
        icon={icon}
        date={date}
        onChange={(_, date) => setFieldValue(changeVariable, date)}
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

export default FormDatePicker;
