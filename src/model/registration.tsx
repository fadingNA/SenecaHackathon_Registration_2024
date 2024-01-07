import { IRegistrationForm } from '../interface/type';
import { createParticipant } from './data/firebase/index';

export class Registration implements IRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  tShirtSize: string;
  program: string;
  collegeName: string;
  registrationType: string;
  teamName: string;
  challengeName: string;
  isTeamCompleted: boolean;
  semester: number;
  graduationYear: number;
  senecaStudentStatus: string;
  pastHackathonParticipation: boolean;
  finaleJoinPreference: string;
  cellPhone: string;

  constructor(formInput: IRegistrationForm) {
    this.firstName = formInput.firstName || '';
    this.lastName = formInput.lastName || '';
    this.email = formInput.email || '';
    this.tShirtSize = formInput.tShirtSize || '';
    this.program = formInput.program || '';
    this.collegeName = formInput.collegeName || '';
    this.registrationType = formInput.registrationType || '';
    this.teamName = formInput.teamName || '';
    this.challengeName = formInput.challengeName || '';
    this.isTeamCompleted = formInput.isTeamCompleted || false;
    this.semester = formInput.semester || -1;
    this.graduationYear = formInput.graduationYear || -1;
    this.senecaStudentStatus = formInput.senecaStudentStatus || '';
    this.pastHackathonParticipation = formInput.pastHackathonParticipation || false;
    this.finaleJoinPreference = formInput.finaleJoinPreference || '';
    this.cellPhone = formInput.cellPhone || '';
  }
  async submitForm() {
    if (this !== undefined) {
      return await createParticipant(this as IRegistrationForm);
    } else {
      throw new Error('Form data is incomplete');
    }
  }
}
