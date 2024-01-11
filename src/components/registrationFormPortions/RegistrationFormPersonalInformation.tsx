import CustomFormLabel from "../utils/CustomFormLabel";
import { Box, InputAdornment } from "@mui/material";
import FormTextField from "../utils/FormTextField";
import { MuiTelInput } from "mui-tel-input";
import { useAtom } from "jotai";
import {
  lastNameAtom,
  firstNameAtom,
  cellPhoneAtom,
  emailAtom,
} from "../../atoms/FormAtoms";
import EmailIcon from "@mui/icons-material/Email";

function RegistrationFormPersonalInformation() {
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [phoneNumber, setPhoneNumber] = useAtom(cellPhoneAtom);
  const [email, setEmail] = useAtom(emailAtom);
  return (
    <Box sx={{ marginTop: 6 }}>
      <CustomFormLabel>Personal Information</CustomFormLabel>
      <Box sx={{ marginLeft: 4 }}>
        <FormTextField
          id="firstName"
          name="firstName"
          label="First Name"
          placeholder="Your first name"
          setVariable={setFirstName}
          variable={firstName}
          defaultValue=""
          sx={{ marginRight: 1 }}
        />
        <FormTextField
          id="lastName"
          name="lastName"
          label="Last Name"
          placeholder="Your last name"
          setVariable={setLastName}
          variable={lastName}
          defaultValue=""
          sx={{ marginRight: 1 }}
        ></FormTextField>

        <FormTextField
          id="email"
          name="email"
          label="Email"
          placeholder="example@myseneca.ca"
          setVariable={setEmail}
          variable={email}
          defaultValue=""
          type="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          sx={{ marginRight: 1 }}
        />
        <MuiTelInput
          value={phoneNumber}
          onChange={setPhoneNumber}
          sx={{ width: "30%", marginTop: 3, marginRight: 1, minWidth: "240px" }}
          defaultCountry="CA"
          
        />
      </Box>
    </Box>
  );
}

export default RegistrationFormPersonalInformation;
