import emailjs from "emailjs-com";

export const sendEmailConfirmation = async (
  email: string,
  firstName: string
) => {
  const templateParams = {
    to_name: firstName,
    to_email: email,
    message: `Thank you for your interest in Housing Hackathon 2024.  \n
    This email serves as an automated confirmation that you have been successfully registered to participate in the Qualifier round of the Hackathon, which is scheduled to begin on March 10, 2024.  \n
    We are thrilled that you've chosen to be a part of this Hackathon, where innovative solutions will be developed to create a positive impact to tackle the Housing challenges. Your participation is invaluable, and we look forward to witnessing the creativity and expertise you bring to the event. \n
    Within 2 business days, our student success team will be reaching out to you with detailed information on the next steps of the competition.\n
    Should you have any questions or require further assistance, please do not hesitate to contact us via email. Additionally, feel free to connect with us through the social media links provided below. \n`,
  };

  return emailjs
    .send(
      import.meta.env.VITE_EMAIL_SERVICE || "service_jbvg8zp",
      import.meta.env.VITE_EMAIL_TEMPLTE_ID || "template_yonqlq1",
      templateParams,
      import.meta.env.VITE_EMAIL_API || "yzlwbHoCvURosBv5j"
    )
    .then((response) => {
      return { status: "success", data: response };
    })
    .catch((err) => {
      return { status: "error", data: err };
    });
};
