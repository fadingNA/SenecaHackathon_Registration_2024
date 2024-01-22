import { Box } from "@mui/material";
import CustomFormLabel from "../utils/CustomFormLabel";
import FormRadioGroup from "../utils/FormRadioGroup";
import FormSelect from "../utils/FormSelect";
import FormNumberField from "../utils/FormNumberField";
import React from "react";

import { useAtom } from "jotai";
import {
  isTeamCompleteAtom,
  //challengeNameAtom,
  tShirtSizeAtom,
  registrationTypeAtom,
  teamNameAtom,
  senecaStatusAtom,
  //finaleJoinPreferenceAtom,
  pastHackathonParticipationAtom,
  numberOfTeamMembersAtom,
  teamMembersAtom,
  senecaAlumniAtom,
  senecaAlumniYearAtom,
  senecaAlumniProgramAtom,
} from "../../atoms/FormAtoms";
import {
  ShirtSizes,
  RegisType,
  //Challenge,
  isTeamCompleteList,
  senecaStudentStatus,
  //Preference,
  pastHackathonParticipationList,
  isAluminieList,
} from "../../interface/type";
import FormTextField from "../utils/FormTextField";

function RegistrationFormRegistrationType() {
  const [isTeamComplete, setIsTeamComplete] = useAtom(isTeamCompleteAtom);
  //const [challengeName, setChallengeName] = useAtom(challengeNameAtom);
  const [tShirtSize, setTShirtSize] = useAtom(tShirtSizeAtom);
  const [registrationType, setRegistrationType] = useAtom(registrationTypeAtom);
  const [teamName, setTeamName] = useAtom(teamNameAtom);
  const [senecaStatus, setSenecaStatus] = useAtom(senecaStatusAtom);
  //const [finaleJoinPreference, setFinaleJoinPreference] = useAtom(
  //  finaleJoinPreferenceAtom
  // );
  const [pastHackathonParticipation, setPastHackathonParticipation] = useAtom(
    pastHackathonParticipationAtom
  );
  const [senecaAlumini, setSenecaAlumini] = useAtom(senecaAlumniAtom);
  const [aluminiYear, setAluminiYear] = useAtom(senecaAlumniYearAtom);
  const [aluminiProgram, setAluminiProgram] = useAtom(senecaAlumniProgramAtom);
  const [teamMembers, setTeamMembers] = useAtom(teamMembersAtom);
  const [numberOfTeamMembers, setNumberOfTeamMembers] = useAtom(
    numberOfTeamMembersAtom
  );

  React.useEffect(() => {
    setTeamMembers(
      Array.from(
        { length: parseInt(numberOfTeamMembers, 10) },
        (_, i) => teamMembers[i] || { firstName: "", lastName: "" }
      )
    );
  }, [numberOfTeamMembers]);

  const handleTeamMemberChange = (
    index: number,
    key: string,
    value: string
  ) => {
    const updatedTeamMembers = teamMembers.map((member, i) =>
      i === index ? { ...member, [key]: value } : member
    );
    setTeamMembers(updatedTeamMembers);
  };

  return (
    <Box sx={{ marginTop: 6 }}>
      <CustomFormLabel>Event-related Information</CustomFormLabel>
      <Box sx={{ marginLeft: 4, marginTop: 3 }}>
        <FormRadioGroup
          id="isAlumini"
          label="Are you a Seneca Graduate?"
          labelId="senecaAlumini"
          variable={senecaAlumini}
          setVariable={setSenecaAlumini}
          valueList={isAluminieList}
          defaultValue=""
          sx={{ marginRight: 1 }}
        />
        {senecaAlumini == "Yes" && (
          <>
            <FormNumberField
              id="aluminiGraduationYear"
              name="aluminiGraduationYear"
              label="Graduation Year"
              placeholder="2019"
              setVariable={setAluminiYear}
              variable={aluminiYear}
              defaultValue=""
              sx={{ marginRight: 1 }}
            />
            <FormTextField
              id="aluminiProgram"
              name="aluminiProgram"
              label="Program name"
              placeholder="Computer Programming and Analysis"
              setVariable={setAluminiProgram}
              variable={aluminiProgram}
              defaultValue=""
              sx={{ marginRight: 1 }}
            />
          </>
        )}
        <FormRadioGroup
          id="pastHackathonParticipation"
          label="Have you participated in any of the previous Seneca Hackathon events?"
          labelId="senecaStatus"
          variable={pastHackathonParticipation}
          setVariable={setPastHackathonParticipation}
          valueList={pastHackathonParticipationList}
          defaultValue=""
          sx={{ marginRight: 1 }}
        />
        <FormRadioGroup
          id="registrationType"
          label="Do you have a team?"
          labelId="registrationType"
          variable={registrationType}
          setVariable={setRegistrationType}
          valueList={RegisType}
          defaultValue=""
          sx={{ marginRight: 1 }}
        />
        {registrationType == "Yes" && (
          <>
            <FormTextField
              id="teamName"
              name="teamName"
              label="Team Name"
              placeholder="Crick-IT"
              setVariable={setTeamName}
              variable={teamName}
              defaultValue=""
              sx={{ marginRight: 1 }}
            />

            {/**
            {teamMembers.length <= 4 && (
              <button type="button" onClick={handleAddPerson} className="mt-9">
                <PersonAddIcon />
              </button>
            )}
             */}

            <div
              onChange={(e: any) => {
                const newCount = e.target.value;
                setTeamMembers(
                  Array.from(
                    { length: parseInt(newCount, 10) },
                    (__, i) => teamMembers[i] || { firstName: "", lastName: "" }
                  )
                );
              }}
            >
              <FormSelect
                label="Number of Team Members"
                labelId="teamMemberCount"
                variable={numberOfTeamMembers.toString()}
                setVariable={(value: any) => setNumberOfTeamMembers(value)}
                valueList={[1, 2, 3, 4, 5].map((num) => num.toString())}
                defaultValue="1"
                sx={{ marginRight: 1 }}
                id="teamMemberCount"
              />
            </div>
            <br />
            <div className="font-medium">
              {teamMembers.map((member, index) => (
                <div key={index} className="">
                  <div className="mr-2 mt-6">
                    <span>Member {index + 1}</span>
                  </div>
                  <FormTextField
                    id={`firstName-${index}`}
                    name="firstName"
                    label="First Name"
                    placeholder="Your first name"
                    setVariable={(value: any) =>
                      handleTeamMemberChange(index, "firstName", value)
                    }
                    variable={member.firstName}
                    defaultValue=""
                    sx={{ marginRight: 1 }}
                  />
                  <FormTextField
                    id={`lastName-${index}`}
                    name="lastName"
                    label="Last Name"
                    placeholder="Your last name"
                    setVariable={(value: any) =>
                      handleTeamMemberChange(index, "lastName", value)
                    }
                    variable={member.lastName}
                    defaultValue=""
                    sx={{ marginRight: 1 }}
                  />
                  <FormTextField
                    id={`institute-${index}`}
                    name="institute"
                    label="Institute"
                    placeholder="Institute Name"
                    setVariable={(value: any) =>
                      handleTeamMemberChange(index, "institute", value)
                    }
                    variable={member.institute}
                    defaultValue=""
                  />
                  <FormTextField
                    id={`email-${index}`}
                    name="email"
                    label="Email"
                    placeholder="Email of your team member"
                    setVariable={(value: any) =>
                      handleTeamMemberChange(index, "email", value)
                    }
                    variable={member.email}
                    defaultValue=""
                    sx={{ marginRight: 1 }}
                  />
                  <FormSelect
                    id={`swagSize-${index}`}
                    label="SWAG Size"
                    formLabel="Select your apparel size? *"
                    labelId={`swagSizeLabel-${index}`}
                    variable={member.swagSize}
                    setVariable={(value: any) =>
                      handleTeamMemberChange(index, "swagSize", value)
                    }
                    valueList={ShirtSizes}
                    defaultValue=""
                    sx={{ marginRight: 1 }}
                  />
                </div>
              ))}
            </div>

            <FormRadioGroup
              id="senecaStatus"
              label="Are you or one of your team members a Seneca Student?"
              labelId="senecaStatus"
              variable={senecaStatus}
              setVariable={setSenecaStatus}
              valueList={senecaStudentStatus}
              defaultValue=""
              sx={{ marginRight: 1 }}
            />
            <FormRadioGroup
              id="isTeamCompleted"
              label="Is your team completed?"
              labelId="isTeamCompleted"
              variable={isTeamComplete}
              setVariable={setIsTeamComplete}
              valueList={isTeamCompleteList}
              defaultValue=""
              sx={{ marginRight: 1 }}
            />
          </>
        )}
        {/*
        <FormSelect
          label="Challenge Set"
          labelId="challengeName"
          formLabel="Select your preferred challenge set? *"
          variable={challengeName}
          setVariable={setChallengeName}
          valueList={Challenge}
          defaultValue=""
          sx={{ marginRight: 1 }}
          id="challengeName"
        />
 <FormRadioGroup
          label="How would you like to join the finale? "
          labelId="finaleJoinPreference"
          variable={finaleJoinPreference}
          setVariable={setFinaleJoinPreference}
          valueList={Preference}
          defaultValue=""
          sx={{ marginRight: 1, position: "relative", left: 0 }}
          id="finaleJoinPreference"
        />
        */}

        <FormSelect
          id="swagSize"
          label="SWAG Size"
          labelId="swagSize"
          formLabel="Select your apparel size? *"
          variable={tShirtSize}
          setVariable={setTShirtSize}
          valueList={ShirtSizes}
          defaultValue=""
          sx={{ marginRight: 1 }}
        />
      </Box>
    </Box>
  );
}

export default RegistrationFormRegistrationType;
