import { Box } from '@mui/material';
import CustomFormLabel from '../utils/CustomFormLabel';
import FormRadioGroup from '../utils/FormRadioGroup';
import FormSelect from '../utils/FormSelect';
import { useAtom } from 'jotai';
import {
  isTeamCompleteAtom,
  challengeNameAtom,
  tShirtSizeAtom,
  registrationTypeAtom,
  teamNameAtom,
  senecaStatusAtom,
  finaleJoinPreferenceAtom,
  pastHackathonParticipationAtom,
} from '../../atoms/FormAtoms';
import {
  ShirtSizes,
  RegisType,
  Challenge,
  isTeamCompleteList,
  senecaStudentStatus,
  Preference,
  pastHackathonParticipationList,
} from '../../interface/type';
import FormTextField from '../utils/FormTextField';

function RegistrationFormRegistrationType() {
  const [isTeamComplete, setIsTeamComplete] = useAtom(isTeamCompleteAtom);
  const [challengeName, setChallengeName] = useAtom(challengeNameAtom);
  const [tShirtSize, setTShirtSize] = useAtom(tShirtSizeAtom);
  const [registrationType, setRegistrationType] = useAtom(registrationTypeAtom);
  const [teamName, setTeamName] = useAtom(teamNameAtom);
  const [senecaStatus, setSenecaStatus] = useAtom(senecaStatusAtom);
  const [finaleJoinPreference, setFinaleJoinPreference] = useAtom(finaleJoinPreferenceAtom);
  const [pastHackathonParticipation, setPastHackathonParticipation] = useAtom(
    pastHackathonParticipationAtom
  );

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
        {registrationType == 'Team' && (
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
            ></FormTextField>
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
