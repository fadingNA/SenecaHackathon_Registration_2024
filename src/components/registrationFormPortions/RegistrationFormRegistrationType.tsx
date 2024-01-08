import { Box } from "@mui/material";
import CustomFormLabel from "../utils/CustomFormLabel";
import FormRadioGroup from "../utils/FormRadioGroup";
import FormSelect from "../utils/FormSelect";
import React from "react";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useAtom } from "jotai";
import {
  isTeamCompleteAtom,
  challengeNameAtom,
  tShirtSizeAtom,
  registrationTypeAtom,
  teamNameAtom,
  senecaStatusAtom,
  finaleJoinPreferenceAtom,
  pastHackathonParticipationAtom,
  numberOfTeamMembersAtom,
} from "../../atoms/FormAtoms";
import {
  ShirtSizes,
  RegisType,
  Challenge,
  isTeamCompleteList,
  senecaStudentStatus,
  Preference,
  pastHackathonParticipationList,
} from "../../interface/type";
import FormTextField from "../utils/FormTextField";

function RegistrationFormRegistrationType() {
  const [isTeamComplete, setIsTeamComplete] = useAtom(isTeamCompleteAtom);
  const [challengeName, setChallengeName] = useAtom(challengeNameAtom);
  const [tShirtSize, setTShirtSize] = useAtom(tShirtSizeAtom);
  const [registrationType, setRegistrationType] = useAtom(registrationTypeAtom);
  const [teamName, setTeamName] = useAtom(teamNameAtom);
  const [senecaStatus, setSenecaStatus] = useAtom(senecaStatusAtom);
  const [finaleJoinPreference, setFinaleJoinPreference] = useAtom(
    finaleJoinPreferenceAtom
  );
  const [pastHackathonParticipation, setPastHackathonParticipation] = useAtom(
    pastHackathonParticipationAtom
  );

  const [teamMembers, setTeamMembers] = React.useState([
    { firstName: "", lastName: "" },
  ]);
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

  const handleTeamMemberChange = (index: number, key: any, value: any) => {
    const updatedTeamMembers = teamMembers.map((member, i) =>
      i === index ? { ...member, [key]: value } : member
    );
    setTeamMembers(updatedTeamMembers);
  };

  const handleRemovePerson = (index: Number) => {
    const updatedTeamMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedTeamMembers);

    if (updatedTeamMembers.length < parseInt(numberOfTeamMembers, 10)) {
      setNumberOfTeamMembers(updatedTeamMembers.length.toString());
    }
  };

  return (
    <Box sx={{ marginTop: 6 }}>
      <CustomFormLabel>Event-related Information</CustomFormLabel>
      <Box sx={{ marginLeft: 4, marginTop: 3 }}>
        <FormRadioGroup
          id="pastHackathonParticipation"
          label="Have you participated in any Seneca hackathon before?"
          labelId="senecaStatus"
          variable={pastHackathonParticipation}
          setVariable={setPastHackathonParticipation}
          valueList={pastHackathonParticipationList}
          defaultValue=""
          sx={{ marginRight: 1 }}
        />
        <FormRadioGroup
          id="registrationType"
          label="Registration Type"
          labelId="registrationType"
          variable={registrationType}
          setVariable={setRegistrationType}
          valueList={RegisType}
          defaultValue=""
          sx={{ marginRight: 1 }}
        />
        {registrationType == "Team" && (
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
            <div className="flex flex-col font-medium">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-row items-center mb-2">
                  <div className="mr-2 mt-6">
                    <span>Member {index + 1}:</span>
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
                  {teamMembers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePerson(index)}
                      className="ml-2 mt-6"
                    >
                      <PersonRemoveIcon />
                    </button>
                  )}
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
        <FormSelect
          label="Challenge Set"
          labelId="challengeName"
          variable={challengeName}
          setVariable={setChallengeName}
          valueList={Challenge}
          defaultValue=""
          sx={{ marginRight: 1 }}
          id="challengeName"
        />
        <FormRadioGroup
          label="How would you like to join the finale?"
          labelId="finaleJoinPreference"
          variable={finaleJoinPreference}
          setVariable={setFinaleJoinPreference}
          valueList={Preference}
          defaultValue=""
          sx={{ marginRight: 1 }}
          id="finaleJoinPreference"
        />
        <FormSelect
          id="swagSize"
          label="SWAG Size"
          labelId="swagSize"
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
