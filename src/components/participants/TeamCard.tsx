/*
TeamCard.tsx
Teamcard component to display team information
By default it will display team name and team members and their College.
*/

import React from "react";
import { IParticipant } from "../../../src/interface/type";

type TeamCardProps = {
  team: IParticipant["team"];
};

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div className="w-full px-4 mb-8 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="mt-2 rounded-xl border-2 border-gray-100 bg-white p-5 shadow-xl transition duration-300 ease-in-out hover:shadow-2xl">
        <h3 className="mb-2 text-xl font-bold">Team: {team?.teamName}</h3>
        {team?.teamMembers.map((member, index) => (
          <p key={index}>
            <p className="font-medium ">Member {index + 1}</p>
            <p>
              Name: {member?.firstName} {member?.lastName}
            </p>
            <p>Insititute name: {member?.institute}</p>
          </p>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
