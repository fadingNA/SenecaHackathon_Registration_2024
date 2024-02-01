import { Box } from "@mui/material";
import CustomFormLabel from "../utils/CustomFormLabel";
import FormRadioGroup from "../utils/FormRadioGroup";
import FormSelect from "../utils/FormSelect";
import FormNumberField from "../utils/FormNumberField";
import React from "react";
import { useAtom } from "jotai";
import {
  isTeamCompleteAtom,
  challengeNameAtom,
  tShirtSizeAtom,
  registrationTypeAtom,
  teamNameAtom,
  senecaStatusAtom,
  //finaleJoinPreferenceAtom,
  doYouFollowUsOnSocialMediaAtom,
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
  Challenge,
  isTeamCompleteList,
  senecaStudentStatus,
  //Preference,
  pastHackathonParticipationList,
  isAluminieList,
  FollowType,
} from "../../interface/type";
import FormTextField from "../utils/FormTextField";

interface RegistrationFormRegistrationTypeProps {
  onTeamMemberEmailChange: (index: number, email: string) => void;
  invalidEmails: Set<number>;
}

const RegistrationFormRegistrationType: React.FC<
  RegistrationFormRegistrationTypeProps
> = ({ onTeamMemberEmailChange, invalidEmails }) => {
  const [isTeamComplete, setIsTeamComplete] = useAtom(isTeamCompleteAtom);
  const [challengeName, setChallengeName] = useAtom(challengeNameAtom);
  const [tShirtSize, setTShirtSize] = useAtom(tShirtSizeAtom);
  const [registrationType, setRegistrationType] = useAtom(registrationTypeAtom);
  const [teamName, setTeamName] = useAtom(teamNameAtom);
  const [senecaStatus, setSenecaStatus] = useAtom(senecaStatusAtom);
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

  const [doYouFollowUsOnSocialMedia, setDoYouFollowUsOnSocialMedia] = useAtom(
    doYouFollowUsOnSocialMediaAtom
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {teamMembers.map((member, index) => (
                <div key={index} className="">
                  <div className="mr-2 ">
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
                    onChange={(e: any) => {
                      handleTeamMemberChange(index, "email", e.target.value);
                      onTeamMemberEmailChange(index, e.target.value);
                    }}
                    error={invalidEmails.has(index)}
                    helperText={
                      invalidEmails.has(index)
                        ? "This email already registered."
                        : ""
                    }
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
            </Box>

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
        <FormRadioGroup
          id="followedUsOnSocialMedia"
          label="Do you followed us on social media?"
          labelId="followedUsOnSocialMediae"
          variable={doYouFollowUsOnSocialMedia}
          setVariable={setDoYouFollowUsOnSocialMedia}
          valueList={FollowType}
          defaultValue=""
          sx={{ marginRight: 1 }}
        />
        {/*
        
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
        <div className="flex items-center font-semibold text-yellow-400 space-x-4 mt-2 mb-2  bg-gray-700 rounded-lg p-2 ">
          <svg
            width="50"
            height="50"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"
              fill="currentColor"
            ></path>
          </svg>

          <div className="text-gray-50 text-xs">
            Please note that the Challenge Category consists of a set of
            challenges that students will be working on. If this category does
            not have a minimum of 50 participants registered, it may be removed.
            In such an event, participants who initially chose that category may
            be requested to select an alternative one. The specific challenge
            statement for participants in this category will be announced closer
            to the beginning of the hackathon.
          </div>
        </div>
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
        <div className="flex items-center font-semibold text-yellow-400 space-x-4 mt-2 mb-2  bg-gray-700 rounded-lg p-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"
              fill="currentColor"
            ></path>
          </svg>

          <div className="text-gray-50 text-xs">
            Duplicate registration is not allowed and you will not be able to
            change the T-shirt size. Please ensure that all the information
            above is correct.
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default RegistrationFormRegistrationType;
