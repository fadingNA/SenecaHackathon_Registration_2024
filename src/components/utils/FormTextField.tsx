import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  SxProps,
  TextField,
  Theme,
  FormHelperText,
} from "@mui/material";

import { Dispatch, SetStateAction } from "react";

interface FormTextFieldProps {
  variable: string | null;
  setVariable:
    | Dispatch<SetStateAction<string>>
    | Dispatch<SetStateAction<null>>;
  label: string;
  placeholder: string;
  id: string;
  name: string;
  defaultValue: string | null;
  className?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  required?: boolean;
  InputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>
    | undefined;
  type?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: boolean;
  helperText?: string;
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
  disabled,
  required,
  InputProps,
  type,
  onChange,
  error = false,
  helperText = "",
}: FormTextFieldProps) {
  const conditionalSetFunction = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onChange) {
      onChange(event);
    } else {
      if (typeof event.target.value === "string") {
        (setVariable as Dispatch<SetStateAction<string>>)(event.target.value);
      } else {
        (setVariable as Dispatch<SetStateAction<null>>)(event.target.value);
      }
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <TextField
          className={`${className}`}
          id={id}
          name={name}
          label={label}
          value={variable ? variable : defaultValue}
          placeholder={placeholder}
          onChange={(event) => conditionalSetFunction(event)}
          sx={{ width: "30%", minWidth: "240px", marginTop: 3, ...sx }}
          disabled={disabled ? disabled : false}
          required={required ? required : true}
          InputProps={{ ...InputProps }}
          type={type ? type : "text"}
          error={error}
        />

        {error && (
          <FormHelperText error className="flex items-center">
            {helperText}
          </FormHelperText>
        )}
      </div>
    </>
  );
}

export default FormTextField;
