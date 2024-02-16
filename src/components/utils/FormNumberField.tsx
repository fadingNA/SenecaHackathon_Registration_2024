import { SxProps, TextField, Theme } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface FormNumberFieldProps {
  variable: null | number;
  setVariable:
    | Dispatch<SetStateAction<number>>
    | Dispatch<SetStateAction<null>>;
  label: string;
  placeholder: string;
  id: string;
  name: string;
  defaultValue: null | number | string;
  className?: string;
  sx?: SxProps<Theme>;
  max?: number;
  min?: number;
}

function FormTextField({
  variable,
  setVariable,
  label,
  placeholder,
  id,
  name,
  defaultValue,
  className,
  sx,
  max,
  min,
}: FormNumberFieldProps) {
  const conditionalSetFunction = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (typeof event.target.value === "number") {
      (setVariable as Dispatch<SetStateAction<number>>)(event.target.value);
    } else {
      (setVariable as Dispatch<SetStateAction<null | string>>)(
        event.target.value
      );
    }
  };
  return (
    <TextField
      className={`${className}`}
      id={id}
      name={name}
      label={label}
      value={variable || defaultValue}
      placeholder={placeholder}
      required
      onChange={(event) => conditionalSetFunction(event)}
      sx={{ width: "30%", marginTop: 3, minWidth: "240px", ...sx }}
      InputProps={{ inputProps: { min: min, max: max } }}
      type="number"
    />
  );
}

export default FormTextField;
