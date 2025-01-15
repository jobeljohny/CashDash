import React from "react";
import { Text } from "react-native";

interface Props {
  error: string;
  visible: boolean;
}

const FormErrorMessage: React.FC<Props> = ({ error, visible }) => {
  if (!error || !visible) return null;
  return <Text style={{ color: "red", fontSize: 12 }}>{error}</Text>;
};

export default FormErrorMessage;
