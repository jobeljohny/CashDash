import React from "react";
import { FormInput, FormErrorMessage } from "../Forms";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";

interface Props {
  name: string;
}

const AppFormField: React.FC<Props> = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <>
      <FormInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      <FormErrorMessage
        error={errors[name as keyof FormikErrors<unknown>]}
        visible={touched[name as keyof FormikTouched<unknown>]}
      />
    </>
  );
};

export default AppFormField;
