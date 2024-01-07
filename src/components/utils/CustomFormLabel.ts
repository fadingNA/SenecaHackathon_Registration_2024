// CustomStyledDiv.js
import { styled } from "@mui/system";

const CustomFormLabel = styled("label")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 1000,
}));

export default CustomFormLabel;
