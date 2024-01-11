/*
ParticipantCard.tsx
Display participant information
Name, email, program, college, registration date
Data from firebase
*/

import React from "react";
import { IParticipant } from "../../../src/interface/type";

type ParticipantCardProps = {
  participant: IParticipant;
};

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant }) => {
  return (
    <div className={divKey}>
      <div className={divKey2}>
        <h3 className="text-xl font-bold">
          {participant.first_name} {participant.last_name}
        </h3>
        <p>Institute: {participant.college}</p>
        <p>Email: {participant.email}</p>
        <p>Program: {participant.program}</p>
        <p>Created date: {participant.registrationDate}</p>
      </div>
    </div>
  );
};

export default ParticipantCard;

// I move from getall to this file
export const divKey = "w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8";
export const divKey2 =
  "p-5 bg-white border-2 border-gray-100 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out mt-2";
