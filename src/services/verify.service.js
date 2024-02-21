const nodemailer = require("nodemailer");


let transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'vraj40983@gmail.com',
    pass: ' nuhzbphfiijboybj',
  },
});

/** Send mail */
const send_otp = async (to ) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  try {

    return transport.sendMail({
      from:'<vraj40983@gmail.com>',
      to,
      subject: "OTP Message",
      html:`your OTP is:${otp}`,
    });
   
  } catch (error) {
    return false;
  }
};

module.exports = {
  send_otp,
};