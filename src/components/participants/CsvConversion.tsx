/*

*/

import { IParticipant } from "../../../src/interface/type";

export const convertToCSV = (objArray: IParticipant[]) => {
  const columns = [
    "first_name",
    "last_name",
    "email",
    "registrationDate",
    "challengeSet",
    "finaleJoinPreference",
    "grad_year",
    "isYourTeamComplete",
    "participate_as",
    "teamName",
    "program",
    "semester",
    "seneca_student_status",
    "tshirt_size",
    "college",
    "alumni",
    "aluminiYear",
    "aluminiProgram",
  ];

  // const columns = ['first_name', 'last_name', 'email', 'college', ... ]; // Define the custom order
  // const columns = Object.keys(objArray[0]).sort(); // Sort the keys alphabetically
  // const columns = Object.keys(objArray[0]); // Use the keys in the order they appear in the object

  // Create header row from columns
  let csvString = columns.join(",") + "\n";
  objArray.forEach((participant) => {
    let participantLine = columns
      .map((key) => {
        if (key === "registrationDate") {
          const [date, time] = participant.registrationDate.split(", ");
          return date + " " + time;
        } else if (key === "teamName") {
          return participant.team ? participant.team.teamName : "NA";
        } else if (key === "challengeSet") {
          return participant.challenge ? participant.challenge : "NA";
        } else {
          const value = participant[key as keyof typeof participant];
          return value !== undefined && value !== null ? value : "NA";
        }
      })
      .join(",");

    csvString += participantLine + "\n";

    const teamName = participant.team?.teamName;
    const challengeName = participant.challenge;

    console.log("challengeName", challengeName);

    if (participant.team && participant.team.teamMembers) {
      console.log("teamName", participant.team.teamName);
      participant.team.teamMembers.forEach((member) => {
        let teamMemberLine = columns
          .map((key) => {
            switch (key) {
              case "first_name":
                return member.firstName;
              case "last_name":
                return member.lastName;
              case "tshirt_size":
                return member.swagSize;
              case "email":
                return member.email;
              case "college":
                return member.institute;
              case "teamName":
                return teamName;
              case "challengeSet":
                return challengeName;
              default:
                return "NA";
            }
          })
          .join(",");

        csvString += teamMemberLine + "\n";
      });
    }
  });

  return csvString;
};

export const downloadCSV = (csvString: string, filename: string) => {
  const commaSeparatedValues = new Blob([csvString], { type: "text/csv;" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(commaSeparatedValues);
  downloadLink.download = filename;
  document.body.appendChild(downloadLink); // Append to the body
  downloadLink.click();
  document.body.removeChild(downloadLink); // Clean up
};
