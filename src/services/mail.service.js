const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "vraj40983@gmail.com",
    pass: " nuhzbphfiijboybj",
  },
});

/** Send mail */
const send_mail = async (to, subject, data) => {
  try {
    return transport.sendMail({
      from: "<vraj40983@gmail.com>",
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
