import { IRegistrationForm } from "../interface/type";
import {
  createParticipant,
  isEmailExist,
  isPhoneExist,
} from "./data/firebase/index";

export class Registration implements IRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  registrationAtDate: string;
  tShirtSize: string;
  program: string;
  collegeName: string;
  registrationType: string;
  team: {
    teamName: string;
    teamMembers: Array<{
      firstName: string;
      lastName: string;
      institute: string;
      customInstitute?: string;
      email?: string;
      swagSize?: string;
    }>;
  };
  challengeName: string;
  isTeamCompleted: string;
  semester: number;
  graduationYear: number;
  senecaStudentStatus: string;
  pastHackathonParticipation: boolean;
  finaleJoinPreference: string;
  cellPhone: string;
  alumini: string;
  aluminiYear?: number;
  aluminiProgram?: string;
  doYouFollowUsOnSocialMedia?: string;

  constructor(formInput: IRegistrationForm) {
    this.firstName = formInput.firstName || "";
    this.lastName = formInput.lastName || "";
    this.email = formInput.email || "";
    this.registrationAtDate = formInput.registrationAtDate || "";
    this.tShirtSize = formInput.tShirtSize || "";
    this.program = formInput.program || "";
    this.collegeName = formInput.collegeName || "";
    this.registrationType = formInput.registrationType || "";
    this.team = formInput.team || { teamName: "", teamMembers: [] };
    this.challengeName = formInput.challengeName || "";
    this.isTeamCompleted = formInput.isTeamCompleted || "No";
    this.semester = formInput.semester || 0;
    this.graduationYear = formInput.graduationYear || 0;
    this.senecaStudentStatus = formInput.senecaStudentStatus || "";
    this.pastHackathonParticipation =
      formInput.pastHackathonParticipation || false;
    this.finaleJoinPreference = formInput.finaleJoinPreference || "";
    this.cellPhone = formInput.cellPhone || "";
    this.alumini = formInput.alumini || "";
    this.aluminiYear = formInput.aluminiYear || 0;
    this.aluminiProgram = formInput.aluminiProgram || "";
    this.doYouFollowUsOnSocialMedia =
      formInput.doYouFollowUsOnSocialMedia || "";
  }
  async submitForm() {
    if (this !== undefined) {
      try {
        const isEmail = await isEmailExist(this.email);
        if (isEmail) {
          throw new Error("Email already exist");
        }
        const isPhone = await isPhoneExist(this.cellPhone);
        if (isPhone) {
          throw new Error(`This ${this.cellPhone} number already exist.`);
        }
        const result = await createParticipant(this);
        if (result) {
          return result;
        }
      } catch (err) {
        throw err;
      }
    }
  }
}
