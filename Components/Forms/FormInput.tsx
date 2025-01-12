import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import Colors from "../../Config/Colors";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface Props extends TextInputProps {
  icon?: IconName;
  width?: string | number;
}

const FormInput: React.FC<Props> = ({
  icon,
  width = "100%",
  ...otherProps
}) => {
  return (
    <View style={[styles.container, { width: width as ViewStyle["width"] }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={Colors.appPrimary}
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor="grey"
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(206, 201, 255, 0.08)",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "baseline",
    padding: 4,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  input: {
    color: "white",
    fontSize: 16,
    flex: 1,
  },
});

export default FormInput;
