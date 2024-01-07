import React, { useEffect, useState } from 'react';
import { ParticipantService } from '../../model/participant';
import { IParticipant } from '../../../src/interface/type';

const GetAllParticipant: React.FC = () => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const participantService = new ParticipantService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allParticipants = await participantService.getAll();
        console.log(allParticipants);
        setParticipants(allParticipants);
      } catch (error) {
        console.error('Failed to fetch participants', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative py-12 md:py-24 bg-gray-50">
      <div className="relative container px-4 mx-auto">
        <h1 className="font-heading tracking-tight text-4xl sm:text-5xl font-bold mb-4">
          Meet our Participants
        </h1>
        <p className="text-lg text-gray-500 mb-20">Here are our esteemed participants.</p>
        <div className="flex flex-wrap -mx-4 -mb-8">
          {participants.map((participant, key) => (
            <div key={key} className={divKey}>
              <div className={divKey2}>
                <div className="text-center">
                  <span className="block text-2xl font-bold mb-2">
                    {participant.first_name} {participant.last_name}
                  </span>
                  <span className="block text-lg text-gray-700 font-medium">
                    {participant.email}
                  </span>

                  <p>{participant.tShirtSize}</p>
                  <p>{participant.program}</p>
                  <p>{participant.college}</p>
                  <p>{participant.registrationType}</p>
                  <p>{participant.teamName}</p>
                  <p>{participant.challengeName}</p>
                  <p>{participant.isTeamComplete}</p>
                  <p>{participant.current_year}</p>
                  <p>{participant.graduationYear}</p>
                  <p>{participant.senecaStudentStatus}</p>
                  <p>{participant.pastHackathonParticipation}</p>
                  <p>{participant.finaleJoinPreference}</p>
                  <p>{participant.cell_phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetAllParticipant;

export const divKey = 'w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8';
export const divKey2 =
  'p-8 bg-white border-2 border-gray-100 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out';
