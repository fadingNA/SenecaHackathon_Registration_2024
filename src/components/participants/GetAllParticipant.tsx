/*
GetAllParticipant.tsx
Get all participant component By default it will display all participants
We can switch to view by team
Get Participant data from firebase
https://console.firebase.google.com/u/0/project/senecahackathonregistration/firestore/data/~2FParticipants~2FSikMkVNJclmbyEYQySNg
*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ParticipantCard from "./ParticipantCard";
import TeamCard from "./TeamCard";
import { IParticipant } from "../../../src/interface/type";
import { ParticipantService } from "../../model/participant";
import { convertToCSV, downloadCSV } from "./CsvConversion";
import { AuthService } from "./Authenticate";
import { auth } from "../../model/data/firebase/Firebase_config"; 

const GetAllParticipant = () => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewByTeam, setViewByTeam] = useState(false);
  const participantService = new ParticipantService();
  const authService = new AuthService(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const loggedIn = authService.isUserLoggedIn();
      if (!loggedIn) {
        navigate("senecaadmin/login");
      } else {
        try {
          const allParticipants: IParticipant[] =
            await participantService.getAll();
          setParticipants(allParticipants);
        } catch (error) {
          console.error("Failed to fetch participants", error);
        } finally {
          setLoading(false);
        }
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDownloadParticipantCSV = () => {
    const csvString: string = convertToCSV(participants);
    const newDate = new Date();
    downloadCSV(csvString, `participants-${newDate.toISOString()}.csv`);
  };

  return (
    <section className="relative py-12 md:py-24 bg-gray-300">
      <div className="relative container px-4 mx-auto">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl font-heading shadow-sm mb-5">
          {viewByTeam ? "Our Teams" : "Our Participants"}
        </h1>
        <div className="mb-8 flex justify-start">
          <button
            className="mr-4 rounded bg-gray-900 px-4 py-2 text-white"
            onClick={() => setViewByTeam(false)}
          >
            View by Participant
          </button>
          <button
            className="mr-4 rounded bg-gray-50 text-gray-900 px-4 py-2"
            onClick={() => setViewByTeam(true)}
          >
            View by Team
          </button>
          <button
            className="mr-4 rounded  right-0 bg-cyan-800 px-4 py-2 text-white"
            onClick={() => handleDownloadParticipantCSV()}
          >
            Download CSV
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
