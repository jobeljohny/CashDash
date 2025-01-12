import { useFormikContext } from "formik";
import React, { FormEvent } from "react";
import {
  Button,
  GestureResponderEvent,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";

interface Props {
  title: string;
}

const FormSubmitButton: React.FC<Props> = ({ title }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <Button
      title={title}
      onPress={
        handleSubmit as unknown as (
          ev: NativeSyntheticEvent<NativeTouchEvent>
        ) => void
      }
    ></Button>
  );
};

export default FormSubmitButton;
