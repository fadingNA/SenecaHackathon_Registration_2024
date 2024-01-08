import React, { useEffect, useState } from "react";
import { ParticipantService } from "../../model/participant";
import { IParticipant } from "../../../src/interface/type";

export const parti = [{}];
const GetAllParticipant: React.FC = () => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const participantService = new ParticipantService();
  const [groupedParticipants, setGroupedParticipants] = useState<
    Record<string, IParticipant[]>
  >({});

  console.log("participants", participants);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allParticipants: IParticipant[] =
          await participantService.getAll();
        console.log("allParticipants", allParticipants);
        const grouped = groupByTeam(allParticipants);
        setGroupedParticipants(grouped);
        console.log("grouped", grouped);
      } catch (error) {
        console.error("Failed to fetch participants", error);
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
    <section className="relative py-12 md:py-24 bg-gray-300">
      <div className="relative container px-4 mx-auto">
        <h1 className="font-heading tracking-tight text-4xl sm:text-5xl font-semibold mb-4">
          Meet our Team
        </h1>
        <p className="text-lg text-gray-500 mb-20">
          Here are our esteemed participants.
        </p>
        <div className="flex flex-wrap -mx-4 -mb-8">
          {Object.entries(groupedParticipants).map(
            ([teamName, teamMembers]) => (
              <div key={teamName} className={divKey}>
                <div className={divKey2 + "text-center"}>
                  <h2 className="font-medium text-md">{teamName}</h2>
                  {teamMembers.map((participant, index) => (
                    <div key={index}>
                      {/* Render participant details */}
                      <div className=" bg-slate-800 p-5 text-gray-50 rounded-sm">
                        {participant.first_name} {participant.last_name}
                      </div>
                      {/* Include other participant details as needed */}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default GetAllParticipant;

export const divKey = "w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8";
export const divKey2 =
  "p-5 bg-white border-2 border-gray-100 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out mt-2";

export const groupByTeam = (participants: IParticipant[]) => {
  return participants.reduce(
    (groups: Record<string, IParticipant[]>, participant: IParticipant) => {
      const team = participant.teamName || "No Team";
      console.log("team", team);
      if (!groups[team]) {
        groups[team] = [];
      }
      groups[team].push(participant);
      console.log("groups", groups);
      return groups;
    },
    {}
  );
};
