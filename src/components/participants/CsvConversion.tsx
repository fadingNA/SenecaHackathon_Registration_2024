/*

*/

import { IParticipant } from "../../../src/interface/type";
const standardizeDate = (dateStr: string): string | null => {
  if (!dateStr) return null;

  // Replace 'a.m.' and 'p.m.' with 'AM' and 'PM' to standardize the meridian
  let standardizedDateStr = dateStr
    .replace(/a\.m\./i, "AM")
    .replace(/p\.m\./i, "PM");

  // Attempt to parse the date string
  let date = new Date(standardizedDateStr);

  // Check for Invalid Date
  if (isNaN(date.getTime())) {
    // Try parsing with a different format (YYYY-MM-DD)
    const parts = standardizedDateStr.split(/[- :]/);
    if (parts.length === 3) {
      // If split by hyphen results in 3 parts, it's likely in YYYY-MM-DD format, attempt a re-parse
      standardizedDateStr = parts.join("/");
      date = new Date(standardizedDateStr);
    }
  }

  // If date is still invalid, return null or original string for manual checking
  if (isNaN(date.getTime())) return null;

  // Format the date into the desired format 'YYYY-MM-DD HH:MM:SS'
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const convertToCSV = (objArray: IParticipant[]) => {
  const columns = [
    "first_name",
    "last_name",
    "email",
    "cell_phone",
    "registrationDate",
    "grad_year",
    "isYourTeamComplete",
    "teamName",
    "program",
    "semester",
    "seneca_student_status",
    "tshirt_size",
    "college",
    "alumini",
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
          if (participant.registrationDate) {
            var date = standardizeDate(participant.registrationDate);
            return date ? date : "NA";
          } else {
            console.log("participant.registrationDate is undefined or empty.");
          }
        } else if (key === "teamName") {
          return participant.team ? participant.team.teamName : "NA";
        } else {
          const value = participant[key as keyof typeof participant];
          return value !== undefined && value !== null ? value : "NA";
        }
      })
      .join(",");

    csvString += participantLine + "\n";

    const teamName = participant.team?.teamName;

    if (participant.team && participant.team.teamMembers) {
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
              case "registrationDate":
                var date = standardizeDate(participant.registrationDate);
                return date ? date : "NA";

              case "isYourTeamComplete":
                return participant.isYourTeamComplete;

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
