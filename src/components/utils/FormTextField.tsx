import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  SxProps,
  TextField,
  Theme,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface FormTextFieldProps {
  variable: string | null;
  setVariable: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<null>>;
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
}: FormTextFieldProps) {
  const conditionalSetFunction = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (typeof event.target.value === 'string') {
      (setVariable as Dispatch<SetStateAction<string>>)(event.target.value);
    } else {
      (setVariable as Dispatch<SetStateAction<null>>)(event.target.value);
    }
  };
  return (
    <TextField
      className={`${className}`}
      id={id}
      name={name}
      label={label}
      value={variable ? variable : defaultValue}
      placeholder={placeholder}
      onChange={(event) => conditionalSetFunction(event)}
      sx={{ width: '30%', minWidth: '240px', marginTop: 3, ...sx }}
      disabled={disabled ? disabled : false}
      required={required ? required : true}
      InputProps={{ ...InputProps }}
      type={type ? type : 'text'}
    />
  );
}

export default FormTextField;
