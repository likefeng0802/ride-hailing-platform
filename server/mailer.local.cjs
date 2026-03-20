const nodemailer = require('nodemailer');

// Please fill your real 163 SMTP credentials below
const transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true,
 auth: { user: 'zhv0831@163.com', pass: 'TThye32ZMw9SPzm2' }
});

const FROM = '推送通知 <zhv0831@163.com>';

async function sendEmail(to, subject, text) {
  await transporter.sendMail({ from: FROM, to, subject, text });
}

module.exports = { sendEmail };
