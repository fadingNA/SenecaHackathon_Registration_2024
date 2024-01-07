import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Dispatch, SetStateAction } from 'react';
import { SxProps, Theme } from '@mui/system';

interface FormRadioGroupProps {
  variable: string | null | number | boolean;
  setVariable:
    | Dispatch<SetStateAction<string>>
    | Dispatch<SetStateAction<null>>
    | Dispatch<SetStateAction<number>>
    | Dispatch<SetStateAction<boolean>>;
  label: string;
  labelId: string;
  id: string;
  className?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  required?: boolean;
  defaultValue: string | null;
  valueList: Array<string | number>;
  row?: boolean;
}

function capitalizeFirstLetter(inputString: string) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export default function FormRadioGroup({
  labelId,
  label,
  id,
  row,
  variable,
  setVariable,
  className,
  sx,
  valueList,
  required,
  defaultValue,
}: FormRadioGroupProps) {
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
    <FormControl
      sx={{ marginTop: 3, ...sx, display: 'block' }}
      className={`${className}`}
      required={required == false ? false : true}
    >
      <FormLabel id={labelId}>{label}</FormLabel>
      <RadioGroup
        row={row == false ? false : true}
        aria-labelledby={labelId}
        name={label}
        value={variable ? variable : defaultValue}
        onChange={(ev) => conditionalSetFunction(ev)}
        id={id}
      >
        {valueList.map((value: number | string | boolean, index) => (
          <FormControlLabel
            key={value.toString() + index}
            value={value}
            control={<Radio />}
            label={typeof value == 'string' ? capitalizeFirstLetter(value) : value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
