import React from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RegistrationFormPersonalInformation from "./registrationFormPortions/RegistrationFormPersonalInformation";
import RegistrationFormEducation from "./registrationFormPortions/RegistrationFormEducation";
import RegistrationFormRegistrationType from "./registrationFormPortions/RegistrationFormRegistrationType";
import { Registration } from "../model/registration";
import { sendEmailConfirmation } from "./SendConfirmation/EmailConfirmation";
import ReCAPTCHA from "react-google-recaptcha";
import { useAtom } from "jotai";
import {
  firstNameAtom,
  lastNameAtom,
  emailAtom,
  tShirtSizeAtom,
  programAtom,
  collegeNameAtom,
  registrationTypeAtom,
  teamNameAtom,
  challengeNameAtom,
  isTeamCompleteAtom,
  semesterAtom,
  teamMembersAtom,
  graduationYearAtom,
  senecaStatusAtom,
  pastHackathonParticipationAtom,
  finaleJoinPreferenceAtom,
  cellPhoneAtom,
  senecaAlumniAtom,
  senecaAlumniYearAtom,
  senecaAlumniProgramAtom,
} from "../atoms/FormAtoms";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  // States for form fields
  const [firstName] = useAtom(firstNameAtom);
  const [lastName] = useAtom(lastNameAtom);
  const [email] = useAtom(emailAtom);
  const [tShirtSize] = useAtom(tShirtSizeAtom);
  const [program] = useAtom(programAtom);
  const [collegeName] = useAtom(collegeNameAtom);
  const [registrationType] = useAtom(registrationTypeAtom);
  const [teamName] = useAtom(teamNameAtom);
  const [challengeName] = useAtom(challengeNameAtom);
  const [isTeamComplete] = useAtom(isTeamCompleteAtom);
  const [semester] = useAtom(semesterAtom);
  const [graduationYear] = useAtom(graduationYearAtom);
  const [senecaStatus] = useAtom(senecaStatusAtom);
  const [cellPhone] = useAtom(cellPhoneAtom);
  const [pastHackathonParticipation] = useAtom(pastHackathonParticipationAtom);
  const [finaleJoinPreference] = useAtom(finaleJoinPreferenceAtom);
  const [teamMembers] = useAtom(teamMembersAtom);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [alumini] = useAtom(senecaAlumniAtom);
  const [aluminiYear] = useAtom(senecaAlumniYearAtom);
  const [aluminiProgram] = useAtom(senecaAlumniProgramAtom);
  const [isReCAPVerified, setIsReCAPVerified] = React.useState(false);

  const onReCAPTCHAChange = (value: any) =>
    setIsReCAPVerified(value ? true : false);

  const navigate = useNavigate();

  const getCurrentDateInCanada = () => {
    const date = new Date();
    return date.toLocaleString("en-CA", { timeZone: "America/Toronto" });
  };

  const registeratDateCA = getCurrentDateInCanada();

  const isFormFilled = () => {
    if (
      firstName &&
      lastName &&
      email &&
      tShirtSize &&
      program &&
      collegeName &&
      registrationType &&
      semester &&
      graduationYear &&
      pastHackathonParticipation &&
      isReCAPVerified &&
      cellPhone
    ) {
      if (
        registrationType === "Yes" &&
        teamName &&
        isTeamComplete &&
        senecaStatus
      ) {
        return true;
      } else if (registrationType === "No") {
        return true;
      }
    }
    return false;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const participant = new Registration({
      firstName: firstName,
      lastName: lastName,
      email: email,
      tShirtSize: tShirtSize,
      program: program,
      collegeName: collegeName,
      registrationType: registrationType,
      team: {
        teamName: teamName,
        teamMembers: teamMembers,
      },
      challengeName: challengeName,
      isTeamCompleted: isTeamComplete,
      semester: semester,
      graduationYear: graduationYear,
      senecaStudentStatus: senecaStatus,
      pastHackathonParticipation: pastHackathonParticipation,
      finaleJoinPreference: finaleJoinPreference,
      cellPhone: cellPhone,
      registrationAtDate: registeratDateCA,
      alumini: alumini,
      aluminiYear: aluminiYear,
      aluminiProgram: aluminiProgram,
    });

    const userId: any = await participant.submitForm();

    const checkStatusEmailSend: any = await sendEmailConfirmation(
      email,
      firstName
    );

    if (checkStatusEmailSend.status === "success") {
      navigate(`/success/${userId}`);
      setIsSubmitted(true);
    } else {
      console.error("Email sending failed:", checkStatusEmailSend.data);
    }
  };

  return (
    <Container
      onSubmit={(ev) => onSubmit(ev)}
      component="form"
      maxWidth="md"
      className="mb-5"
    >
      <Typography variant="h1">Registration Form</Typography>
      {/* Personal Information */}
      <RegistrationFormPersonalInformation />

      {/* Education */}
      <RegistrationFormEducation />

      <RegistrationFormRegistrationType />

      <Box sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
        <ReCAPTCHA
          sitekey="6Lc18VgpAAAAADE5aFI8Y7gUl7gIL10fGj-VoiRi"
          onChange={onReCAPTCHAChange}
        />
      </Box>
      {/* Button set */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Button
          variant="contained"
          type="submit"
          sx={{ width: "30%" }}
          disabled={!isFormFilled() || isSubmitted}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default RegistrationForm;
