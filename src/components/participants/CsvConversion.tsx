/*

*/

import { IParticipant } from "../../../src/interface/type";

export const convertToCSV = (objArray: IParticipant[]) => {
  const columns = [
    "email",
    "finaleJoinPreference",
    "first_name",
    "grad_year",
    "isYourTeamComplete",
    "last_name",
    "participate_as",
    "program",
    "registrationDate",
    "semester",
    "seneca_student_status",
    "teamName",
    "teamMembers",
    "tshirt_size",
    "college",
    "registrationDate",
  ];

  // const columns = ['first_name', 'last_name', 'email', 'college', ... ]; // Define the custom order
  // const columns = Object.keys(objArray[0]).sort(); // Sort the keys alphabetically
  // const columns = Object.keys(objArray[0]); // Use the keys in the order they appear in the object

  // Create header row from columns
  let csvString = columns.join(",") + "\n";

  // Map each participant object to a CSV row
  objArray.forEach((participant) => {
    let line = columns
      .map((key) => {
        if (key === "team") {
          let team_data = null;
          if (participant.team) {
            team_data = participant.team.teamName;
            if (participant.team.teamMembers.length > 0) {
              team_data += " (";
              team_data += participant.team.teamMembers
                .map((member) => {
                  return `${member.firstName} ${member.lastName}`;
                })
                .join("|");
              team_data += ")";
            }
          }
          // Handle nested 'teamName'
          return team_data ? team_data : "NA";
        } else if (key === "teamMembers") {
          // Handle nested 'teamMembers'
          return participant.team?.teamMembers
            .map((member) => {
              return `${member.firstName} ${member.lastName}`;
            })
            .join("|");
        } else if (key === "registrationDate") {
          // Handle nested 'registrationDate'
          try {
            const date = new Date(participant.registrationDate);
            return `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(
              2,
              "0"
            )}::${String(date.getHours()).padStart(2, "0")}:${String(
              date.getMinutes()
            ).padStart(2, "0")}`;
          } catch (err) {
            console.log(err);
          }
        } else {
          // Access the properties using type assertion
          const value = participant[key as keyof IParticipant];
          return value !== undefined && value !== null ? value : "NA";
        }
      })
      .join(",");

    csvString += line + "\n";
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
