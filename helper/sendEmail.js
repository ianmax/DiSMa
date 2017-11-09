function sendEmail(itemName, supplierEmail, cb) {
  console.log(supplierEmail);
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
    to: `${supplierEmail}, christiantobs@gmail.com`,
    subject: 'Request Stock',
    text: `ada permintaan penambahan stock ${itemName}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Waduh', error.message);
    }
    cb('Request Sent!');

  });
}

module.exports = sendEmail;
