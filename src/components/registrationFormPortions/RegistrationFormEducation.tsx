import CustomFormLabel from "../utils/CustomFormLabel";
import { Box } from "@mui/material";
import FormTextField from "../utils/FormTextField";
import FormSelect from "../utils/FormSelect";
import { useAtom } from "jotai";
import collegeList from "./csvjson";
import {
  programAtom,
  collegeNameAtom,
  semesterAtom,
  graduationYearAtom,
} from "../../atoms/FormAtoms";

import FormNumberField from "../utils/FormNumberField";

function RegistrationFormEducation() {
  const [programName, setProgramName] = useAtom(programAtom);
  const [institution, setInstitution] = useAtom(collegeNameAtom);
  const [semester, setSemester] = useAtom(semesterAtom);
  const [graduationYear, setGraduationYear] = useAtom(graduationYearAtom);

  return (
    <Box sx={{ marginTop: 6 }}>
      <CustomFormLabel>Education Information</CustomFormLabel>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginLeft: 4,
        }}
      >
        <FormSelect
          label="College Name"
          labelId="collegeName"
          variable={institution}
          setVariable={setInstitution}
          valueList={collegeList.province.map(
            (college: any) => college["College/University Name"]
          )}
          defaultValue=""
          sx={{ marginRight: 1, marginTop: 3 }}
          id="collegeName"
        />

        <FormTextField
          id="programName"
          name="programName"
          label="Program"
          placeholder="Computer Programming and Analysis or CPA , etc"
          setVariable={setProgramName}
          variable={programName}
          defaultValue=""
          sx={{ marginRight: 1 }}
        ></FormTextField>

        <FormNumberField
          id="semester"
          name="semester"
          label="Current Semester"
          placeholder="3"
          setVariable={setSemester}
          variable={semester}
          defaultValue={""}
          sx={{ marginRight: 1 }}
          max={10}
          min={1}
        />

        <FormNumberField
          id="graduationYear"
          name="graduationYear"
          label="Graduation Year"
          placeholder="2024"
          setVariable={setGraduationYear}
          variable={graduationYear}
          defaultValue={2024}
          sx={{ marginRight: 1 }}
          max={2030}
          min={1967}
        />
      </Box>
    </Box>
  );
}

export default RegistrationFormEducation;
