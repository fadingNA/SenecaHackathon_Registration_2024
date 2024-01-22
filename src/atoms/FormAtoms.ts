import { atom } from "jotai";

export const idAtom = atom("");
export const firstNameAtom = atom("");
export const lastNameAtom = atom("");
export const emailAtom = atom("");
export const cellPhoneAtom = atom("");
export const programAtom = atom("");
export const collegeNameAtom = atom("");
export const teamRoleAtom = atom("");
export const isTeamCompleteAtom = atom("");
export const tShirtSizeAtom = atom("");
export const challengeNameAtom = atom("");
export const discoveryMethodAtom = atom("");
export const platformAtom = atom("");
export const senecaStatusAtom = atom("");
export const graduationYearAtom = atom(2024);
export const semesterAtom = atom(3);
export const pastHackathonParticipationAtom = atom(false);
export const finaleJoinPreferenceAtom = atom("");
export const registrationTypeAtom = atom("");
export const senecaAlumniAtom = atom("");
export const senecaAlumniYearAtom = atom(2023);
export const senecaAlumniProgramAtom = atom("");

// Non add
// Atom for team name
export const teamNameAtom = atom("");

// Atom for team members array
export const teamMembersAtom = atom<
  {
    firstName: string;
    lastName: string;
    institute: string;
    email: string;
    swagSize: string;
  }[]
>([]);

// (for UI rendering or other logic)
export const numberOfTeamMembersAtom = atom("0");

//  adding new team members dynamically
export const newTeamMemberTemplate = atom(() => ({
  firstName: "",
  lastName: "",
  institute: "",
}));
