import { useFormikContext } from "formik";
import React from "react";
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "../../Config/Colors";

interface Props {
  title: string;
}

const FormSubmitButton: React.FC<Props> = ({ title }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={
        handleSubmit as unknown as (
          ev: NativeSyntheticEvent<NativeTouchEvent>
        ) => void
      }
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.appPrimary,
    borderRadius: 6,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default FormSubmitButton;
