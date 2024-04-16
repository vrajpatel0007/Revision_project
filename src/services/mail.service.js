const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "< Your Email >",
    pass: "< Passowrd >",
  },
});

/** Send mail */
const send_mail = async (to, subject, data) => {
  try {
    return transport.sendMail({
      from: "< Your Email >",
      to,
      subject,
      html: data,
    });
  } catch (error) {
    return false;
  }
};

module.exports = {
  send_mail,
};
