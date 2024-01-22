export interface IRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  registrationAtDate: string;
  tShirtSize: string;
  program: string;
  collegeName?: string;
  registrationType: string;
  team: {
    teamName: string;
    teamMembers: Array<{
      firstName: string;
      lastName: string;
      institute: string;
      email?: string;
      swagSize?: string;
    }>;
  };
  challengeName: string;
  isTeamCompleted?: string;
  semester?: number;
  graduationYear?: number;
  senecaStudentStatus: string;
  pastHackathonParticipation: boolean;
  finaleJoinPreference: string;
  cellPhone: string;
  alumini: string;
  aluminiYear?: number;
  aluminiProgram?: string;
}

export interface IParticipant {
  email: string;
  finaleJoinPreference: string;
  first_name: string;
  grad_year: number;
  isYourTeamComplete: string;
  last_name: string;
  participate_as: string;
  program: string;
  registrationDate: string;
  semester: number;
  seneca_student_status: string;
  team: {
    teamName: string;
    teamMembers: Array<{
      firstName: string;
      lastName: string;
      institute: string;
      email?: string;
      swagSize?: string;
    }>;
  };
  tshirt_size: string;
  college: string;
  alumini: string;
  aluminiYear?: number;
  aluminiProgram?: string;
  challenge: string;
}

export const RegisType = ["Yes", "No"];

export const Challenge = ["Challenge1", "Challenge2", "Chellenge3"];

export const DiscoveryMethod = ["Social Media", "Seneca", "Other"];

export const Preference = ["Virtual", "In-person"];

export const ShirtSizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const finaleJoinPreference = ["Yes", "No", "Maybe"];

export const isTeamCompleteList = ["Yes", "No"];

export const senecaStudentStatus = ["Yes", "No"];

export const pastHackathonParticipationList = ["Yes", "No"];

export const isAluminieList = ["Yes", "No"];

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
