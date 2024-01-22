import { IParticipant, IRegistrationForm } from '../interface/type';
import {
  createParticipant,
  updateParticipant,
  removeParticipant,
  getParticipant,
  getAllParticipants,
} from './data/firebase/index';

export class ParticipantService {
  async create(formInput: IRegistrationForm) {
    return createParticipant(formInput);
  }

  async update(participantId: string, participantData: Partial<IParticipant>) {
    return updateParticipant(participantId, participantData);
  }

  async delete(participantId: string) {
    return removeParticipant(participantId);
  }

  async getById(participantId: string): Promise<IParticipant | undefined> {
    return getParticipant(participantId);
  }

  async getAll(): Promise<IParticipant[]> {

    return getAllParticipants();
  }
}
