// index.ts
import { addDoc, doc, updateDoc, deleteDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase_config';
import { IParticipant, IRegistrationForm } from '../../../interface/type';

export const createParticipant = async (participant: IRegistrationForm) => {
  try {
    const docRef = await addDoc(collection(db, 'Participants'), {
      first_name: participant.firstName,
      last_name: participant.lastName,
      college: participant.collegeName,
      program: participant.program,
      semester: participant.semester,
      grad_year: participant.graduationYear,
      email: participant.email,
      tshirt_size: participant.tShirtSize,
      participate_as: participant.registrationType,
    });
    console.log('Participant created with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const updateParticipant = async (
  participantId: string,
  participantData: Partial<IParticipant>
) => {
  try {
    const docRef = doc(db, 'Participants', participantId);
    await updateDoc(docRef, participantData);
    console.log('Participant updated with ID:', participantId);
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const removeParticipant = async (participantId: string) => {
  try {
    const docRef = doc(db, 'Participants', participantId);
    await deleteDoc(docRef);
    console.log('Participant deleted with ID:', participantId);
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};

export const getParticipant = async (participantId: string): Promise<IParticipant | undefined> => {
  try {
    const docRef = doc(db, 'Participants', participantId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Participant data:', docSnap.data());
      return docSnap.data() as IParticipant;
    } else {
      console.log('No participant found!');
      return undefined;
    }
  } catch (error) {
    console.error('Error getting document: ', error);
  }
};

export const getAllParticipants = async (): Promise<IParticipant[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Participants'));
    const participants = querySnapshot.docs.map((doc) => {
      return { ...doc.data() } as IParticipant;
    });
    return participants;
  } catch (err) {
    console.error('Error fetching participants:', err);
    return [];
  }
};
