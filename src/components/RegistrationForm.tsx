import React from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RegistrationFormPersonalInformation from "./registrationFormPortions/RegistrationFormPersonalInformation";
import RegistrationFormEducation from "./registrationFormPortions/RegistrationFormEducation";
import RegistrationFormRegistrationType from "./registrationFormPortions/RegistrationFormRegistrationType";
import { Registration } from "../model/registration";
import { isEmailExist } from "../model/data/firebase/index";
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
  doYouFollowUsOnSocialMediaAtom,
  senecaAlumniProgramAtom,
} from "../atoms/FormAtoms";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  // States for form fields

  const [emailError, setEmailError] = React.useState("");
  const [membersThatAreDupes, setMembersThatAreDupes] = React.useState<
    number[]
  >([]);
  const [invalidEmails, setInvalidEmails] = React.useState<Set<number>>(
    new Set()
  );
  const emailExistenceCache: Record<string, boolean> = {};

  const [firstName] = useAtom(firstNameAtom);
  const [lastName] = useAtom(lastNameAtom);
  const [email, setEmail] = useAtom(emailAtom);
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
  const [doYouFollowUsOnSocialMedia] = useAtom(doYouFollowUsOnSocialMediaAtom);

  const handlePersonalEmailChange = async (newEmail: string) => {
    setEmail(newEmail);

    const emailExists = await isEmailExist(newEmail);
    if (emailExists) {
      setEmailError("This email is already registered.");
      setInvalidEmails((prev) => new Set(prev).add(-1));
    } else {
      setEmailError("");
      setInvalidEmails(
        new Set([...invalidEmails].filter((index) => index !== -1))
      );
    }
  };

  const checkEmailInFireBase = async (email: string): Promise<Boolean> => {
    if (email in emailExistenceCache) {
      return emailExistenceCache[email];
    }
    const emailExists = await isEmailExist(email);
    emailExistenceCache[email] = emailExists;
    return emailExists;
  };

  const isInvalidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return !emailRegex.test(email);
  };

  const handleEmailChange = async (index: number, newEmail: string) => {
    const updatedTeamMembers = teamMembers.map((member, i) => {
      if (i === index) {
        return { ...member, email: newEmail };
      }
      return member;
    });

    let emailList = new Set([email]);
    let dupeEmail = new Set<number>();
    let invalidEmails = new Set<number>();

    updatedTeamMembers.forEach((member, idx) => {
      if (emailList.has(member.email) || isInvalidEmail(member.email)) {
        dupeEmail.add(idx);
      } else {
        emailList.add(member.email);
      }
    });

    for (const [idx, member] of updatedTeamMembers.entries()) {
      if (!dupeEmail.has(idx) && !isInvalidEmail(member.email)) {
        const emailExists = await checkEmailInFireBase(member.email);
        if (emailExists) {
          invalidEmails.add(idx);
        }
      }
    }
    setMembersThatAreDupes(Array.from(dupeEmail));
    setInvalidEmails(invalidEmails);
    setEmailError(
      dupeEmail.size > 0 || invalidEmails.size > 0
        ? "Duplicate or invalid email addresses are not allowed."
        : ""
    );
  };

  React.useEffect(() => {
    setEmailError("");
  }, [email]);

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
      !emailError &&
      isReCAPVerified &&
      graduationYear &&
      pastHackathonParticipation &&
      challengeName &&
      doYouFollowUsOnSocialMedia &&
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
    setIsSubmitted(true);

    try {
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
        doYouFollowUsOnSocialMedia: doYouFollowUsOnSocialMedia,
      });

      const userId: any = await participant.submitForm();

      if (userId) {
        navigate(`/success/${userId}`);
        setIsSubmitted(true);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err: any) {
      setIsSubmitted(false);
      console.log(err);

      if (err instanceof Error) {
        setEmailError(err.message);
      } else {
        console.error("Form submission failed:", err);
      }
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
      <RegistrationFormPersonalInformation
        onEmailChange={handlePersonalEmailChange}
        invalidEmails={invalidEmails}
      />

      {/* Education */}
      <RegistrationFormEducation />

      <RegistrationFormRegistrationType
        onTeamMemberEmailChange={handleEmailChange}
        invalidEmails={invalidEmails}
      />

      {emailError && (
        <div
          className="bg-red-100 border mt-3 ml-8 text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{emailError}</span>

          {membersThatAreDupes.length > 0 &&
            "Duplicate emails: " + membersThatAreDupes.join(", ")}
        </div>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
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
          marginTop: 5,
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
