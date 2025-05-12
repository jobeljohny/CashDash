import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import React from "react";
import { StyleSheet, Text, TextInputProps, View } from "react-native";
import Colors from "../../Config/Colors";
import { FormErrorMessage, FormInput } from "../Forms";

interface Props extends TextInputProps {
  name: string;
  floatingLabel: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  changeVariable: string;
}
const AppFormField: React.FC<Props> = ({
  name,
  floatingLabel,
  ...otherProps
}) => {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();
  const currentValue = values[name as keyof typeof values];

  // Convert current value to string if it exists
  const valueAsString =
    currentValue !== undefined && currentValue !== null && currentValue !== 0
      ? String(currentValue)
      : undefined;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{floatingLabel}</Text>
        <FormInput
          onBlur={() => setFieldTouched(name)}
          onChangeText={handleChange(name)}
          value={valueAsString}
          {...otherProps}
        />
      </View>

      <View style={styles.errorMessage}>
        <FormErrorMessage
          error={errors[name as keyof FormikErrors<unknown>]}
          visible={touched[name as keyof FormikTouched<unknown>]}
        />
      </View>
    </>
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
  errorMessage: {
    position: "absolute",
    left: 2,
    bottom: -18,
  },
});

export default AppFormField;
