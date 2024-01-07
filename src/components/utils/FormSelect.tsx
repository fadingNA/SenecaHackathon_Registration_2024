import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { InputLabel, SxProps, Theme } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface FormSelectProps {
  variable: string | null;
  setVariable: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<null>>;
  label: string;
  labelId: string;
  id: string;
  className?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  required?: boolean;
  defaultValue: string | null;
  valueList: Array<string | number>;
}

function FormSelect({
  id,
  labelId,
  variable,
  setVariable,
  className,
  disabled,
  required,
  sx,
  label,
  defaultValue,
  valueList,
}: FormSelectProps) {
  const conditionalSetFunction = (event: SelectChangeEvent<string | null>) => {
    if (typeof event.target.value === 'string') {
      (setVariable as Dispatch<SetStateAction<string>>)(event.target.value);
    } else {
      (setVariable as Dispatch<SetStateAction<null>>)(event.target.value);
    }
  };
  return (
    <FormControl
      sx={{ width: '30%', minWidth: '240px', marginTop: 3 , ...sx }}
      className={`${className}`}
      required={required==false ? false : true}
      disabled={disabled ? disabled : false}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={variable ? variable : defaultValue}
        label="Type"
        onChange={(event) => conditionalSetFunction(event)}
      >
        {valueList.map((value: number | string) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FormSelect;
