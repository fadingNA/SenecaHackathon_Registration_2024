/*
GetAllParticipant.tsx
Get all participant component By default it will display all participants
We can switch to view by team
Get Participant data from firebase
https://console.firebase.google.com/u/0/project/senecahackathonregistration/firestore/data/~2FParticipants~2FSikMkVNJclmbyEYQySNg
*/

import React, { useState } from "react";
import ParticipantCard from "./ParticipantCard";
import TeamCard from "./TeamCard";
import { IParticipant } from "../../../src/interface/type";
import { ParticipantService } from "../../model/participant";

const GetAllParticipant: React.FC = () => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewByTeam, setViewByTeam] = useState<boolean>(false);
  const participantService = new ParticipantService();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const allParticipants: IParticipant[] =
          await participantService.getAll();
        console.log("allParticipants", allParticipants);
        setParticipants(allParticipants);
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
        <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl font-heading">
          {viewByTeam ? "Our Teams" : "Our Participants"}
        </h1>
        <div className="mb-8 flex justify-center">
          <button
            className="mr-4 rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => setViewByTeam(false)}
          >
            View by Participant
          </button>
          <button
            className="rounded bg-green-500 px-4 py-2 text-white"
            onClick={() => setViewByTeam(true)}
          >
            View by Team
          </button>
        </div>
        <div className="flex flex-wrap -mx-4">
          {viewByTeam
            ? participants
                .filter(
                  (participant) =>
                    participant?.team &&
                    participant?.team?.teamMembers.length > 0
                )
                .map((participant, index) => (
                  // Dont fix key as index it will cause issue when  delete a team
                  <TeamCard
                    key={`${participant?.team}-${index}`}
                    team={participant.team}
                  />
                ))
            : participants.map((participant, index) => (
                <ParticipantCard key={index} participant={participant} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default GetAllParticipant;
