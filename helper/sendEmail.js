function sendEmail(itemName) {
  const nodemailer = require('nodemailer');
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'testemailajah@gmail.com',
      pass: 'testemail12345'
    }
  });

  let mailOptions = {
    from: 'testemaiajah@gmail.com',
    to: 'albiardtya@gmail.com, christiantobs@gmail.com',
    subject: 'Request Stock',
    text: `ada permintaan penambahan stock ${itemName}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Waduh', error.message);
    }
    console.log('Message Sent!');

  });
}

module.exports = sendEmail;
