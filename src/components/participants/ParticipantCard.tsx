/*
ParticipantCard.tsx
Display participant information
Name, email, program, college, registration date
Data from firebase
*/
import React from "react";
import { IParticipant } from "../../../src/interface/type";
import SchoolIcon from "@mui/icons-material/School";
import EmailIcon from "@mui/icons-material/Email";
import BookIcon from "@mui/icons-material/Book";
import EventIcon from "@mui/icons-material/Event";

type ParticipantCardProps = {
  participant: IParticipant;
};

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant }) => {
  return (
    <div className={divKey}>
      <div className={divKey2}>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
          {participant.first_name} {participant.last_name}
        </h3>
        <div className="flex items-center text-sm mb-1">
          <SchoolIcon className="mr-2 text-red-600" />
          <span>Institute: {participant.college}</span>
        </div>
        <div className="flex items-center text-sm mb-1">
          <EmailIcon className="mr-2 text-red-600" />
          <span>Email: {participant.email}</span>
        </div>
        <div className="flex items-center text-sm mb-1">
          <BookIcon className="mr-2 text-red-600" />
          <span>Program: {participant.program}</span>
        </div>
        <div className="flex items-center text-sm mb-1">
          <EventIcon className="mr-2 text-red-600" />
          <span>Registration date: {participant.registrationDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ParticipantCard;

// I move from getall to this file
export const divKey = "w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8";
export const divKey2 =
  "p-5 bg-white border-2 border-gray-100 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out mt-2";
