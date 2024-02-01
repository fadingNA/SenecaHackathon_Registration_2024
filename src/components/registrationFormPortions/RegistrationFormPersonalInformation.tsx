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

interface PersonalProps {
  onEmailChange: (email: string) => void;
  invalidEmails: Set<number>;
}

const RegistrationFormPersonalInformation: React.FC<PersonalProps> = ({
  onEmailChange,
  invalidEmails,
}) => {
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [phoneNumber, setPhoneNumber] = useAtom(cellPhoneAtom);
  const [email, setEmail] = useAtom(emailAtom);

  return (
    <Box sx={{ marginTop: 6 }}>
      <div className="flex" style={{ alignItems: "center" }}>
        <CustomFormLabel>Personal Information </CustomFormLabel>
        <p
          className="pl font-light pt-0.5  text-[0.9rem] text-[#D92D27]"
          style={{ margin: 0, paddingLeft: "10px" }}
        >
          (Team leader must be registering on behalf of your team. <br /> Or you
          can register as an individual and join a team later.)
        </p>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginLeft: 4,
        }}
      >
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
          onChange={(e) => onEmailChange(e.target.value)}
          error={invalidEmails.has(-1)}
          helperText={
            invalidEmails.has(-1) ? "This email is already registered." : ""
          }
        />
        <MuiTelInput
          value={phoneNumber}
          onChange={setPhoneNumber}
          sx={{ width: "30%", marginTop: 1, marginRight: 1, minWidth: "240px" }}
          defaultCountry="CA"
        />
      </Box>
    </Box>
  );
};

export default RegistrationFormPersonalInformation;
