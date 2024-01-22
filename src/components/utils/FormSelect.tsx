import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
  SxProps,
  Theme,
  FormLabel, // import FormLabel from Material UI
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface FormSelectProps {
  variable: string | number | null;
  setVariable:
    | Dispatch<SetStateAction<string>>
    | Dispatch<SetStateAction<number>>
    | Dispatch<SetStateAction<null>>;
  label: string;
  labelId: string;
  id: string;
  className?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  required?: boolean;
  defaultValue: string | null;
  valueList: Array<string | number>;
  formLabel?: string; // optional prop for the form label text
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
  formLabel, // destructure the formLabel from props
}: FormSelectProps) {
  const conditionalSetFunction = (
    event: SelectChangeEvent<string | number | null>
  ) => {
    if (typeof event.target.value === "string") {
      (setVariable as Dispatch<SetStateAction<string | number>>)(
        event.target.value
      );
    } else {
      (setVariable as Dispatch<SetStateAction<null | number>>)(
        event.target.value
      );
    }
  };

  return (
    <>
      <FormLabel className="block -mb-5 mt-2">
        {formLabel ? formLabel : ""}
      </FormLabel>
      <FormControl
        sx={{ width: "30%", minWidth: "240px", marginTop: 4, ...sx }}
        className={`${className}`}
        required={required == false ? false : true}
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
    </>
  );
}

export default FormSelect;
