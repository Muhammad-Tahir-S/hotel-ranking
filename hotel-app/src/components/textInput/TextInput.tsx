/* eslint-disable no-sparse-arrays */
import { Input, Text, Box, ThemeUICSSObject } from "theme-ui";
import { motion } from "framer-motion";
import { FC } from "react";
import { FormikErrors, FormikTouched } from "formik";

const errorVariants = {
  valid: {
    opacity: 0,
    y: -10,
  },
  invalid: {
    opacity: 1,
    y: 0,
  },
};

export const TextInput: FC<{
  value: string | number | undefined;
  type?: React.HTMLInputTypeAttribute;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onChange?: (value: string) => void;
  sx?: ThemeUICSSObject;
  id?: string;
  name?: string;
  label?: string;
  valid?: boolean;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
  error?:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  inputStyles?: ThemeUICSSObject | undefined;
  placeholder?: string;

  disabled?: boolean;
  helperText?: string;
  helperAction?: () => void;
}> = ({
  value,
  onChange,
  onBlur,
  type,
  id,
  name,
  sx,
  label,
  valid,
  error,
  touched,
  inputStyles,
  placeholder,
  disabled,
  helperAction,
  helperText,
  ...props
}) => {
  return (
    <Box sx={{ width: "100%", ...sx }}>
      <Text
        sx={{
          fontWeight: "bold",
          whiteSpace: "nowrap",
          fontSize: "14px",
          color: error && touched ? "red" : "black",
        }}
      >
        {label}
      </Text>

      <Input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : () => ({})}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
        sx={{
          fontSize: "14px",
          backgroundColor: "white",
          mt: "6px",
          "&:hover": {
            outline: "none",
          },
          "&:focus": {
            outline: "none",
          },
        }}
      />

      {helperText ? (
        <Box onClick={helperAction} sx={{ mt: "5px" }}>
          <Text
            sx={{
              color: "secondary",
              cursor: "pointer",
            }}
          >
            {helperText}
          </Text>
        </Box>
      ) : null}

      {error && touched ? (
        <motion.div
          style={{
            marginBottom: error ? 10 : 0,
          }}
          variants={errorVariants}
          initial={error && touched ? "invalid" : "valid"}
          animate={error && touched ? "invalid" : "valid"}
        >
          <Text
            sx={{
              color: "red",
              maxWidth: "100px",
            }}
          >
            {error as string}
          </Text>
        </motion.div>
      ) : null}
    </Box>
  );
};
