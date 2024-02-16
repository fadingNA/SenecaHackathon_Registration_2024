/*
TeamCard.tsx
Teamcard component to display team information
By default it will display team name and team members and their College.
*/

import React from "react";
import { IParticipant } from "../../../src/interface/type";
import PersonIcon from '@mui/icons-material/Person';

type TeamCardProps = {
  team: IParticipant["team"];
};

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div className="w-full px-4 mb-8 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="mt-2 rounded-xl border-2 border-gray-300 bg-white p-5 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
        <h3 className="mb-4 text-2xl font-bold text-indigo-600">
          Team: {team?.teamName}
        </h3>
        {team?.teamMembers.map((member, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-1">
              <PersonIcon className="mr-2 text-indigo-500" />
              <span className="font-semibold">Member {index + 1}</span>
            </div>
            <p className="pl-6 text-sm">
              Name: {member?.firstName} {member?.lastName}
            </p>
            <p className="pl-6 text-sm">Institute: {member?.institute}</p>
            <p className="pl-6 text-sm">Email: {member?.email}</p>
            <p className="pl-6 text-sm">Swag Size: {member?.swagSize}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
