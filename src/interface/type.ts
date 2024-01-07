export interface IRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  tShirtSize: string;
  program: string;
  collegeName?: string;
  registrationType: string;
  teamName?: string;
  challengeName: string;
  isTeamCompleted?: boolean;
  semester?: number;
  graduationYear?: number;
  senecaStudentStatus: string;
  pastHackathonParticipation: boolean;
  finaleJoinPreference: string;
  cellPhone: string;
}

export interface IParticipant {
  first_name: string;
  last_name: string;
  email: string;
  cell_phone: string;
  registrationType: string;
  college: string;
  program: string;
  current_year: number;
  teamName?: string;
  teamRole?: string;
  isTeamComplete: boolean;
  tShirtSize: string;
  challengeName: string;
  discoveryMethod: string;
  senecaStudentStatus: string;
  graduationYear: number;
  pastHackathonParticipation: boolean;
  finaleJoinPreference: string;
}

export const RegisType = ['Team', 'Individual'];

export const Challenge = ['Challenge1', 'Challenge2', 'Chellenge3'];

export const DiscoveryMethod = ['Social Media', 'Seneca', 'Other'];

export const Preference = ['Virtual', 'In-person', 'Maybe'];

export const ShirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const finaleJoinPreference = ['Yes', 'No', 'Maybe'];

export const isTeamCompleteList = ['Yes', 'No'];

export const senecaStudentStatus = ['Yes', 'No'];

export const pastHackathonParticipationList = ['Yes', 'No'];

export interface ChallengeSet {
  name: string;
  description: string;
  category: string;
  challenge: string;
  challengeType: string;
  challengeLink: string;
  challengeLinkText: string;
  challengeLinkDescription: string;
  challengeLinkImage: string;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}
