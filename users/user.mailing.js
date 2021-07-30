require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "anastasiia.ucraniana@gmail.com",
  from: "anna.collana@gmail.com",
  subject: "Nodemailer test",
  text: "lkiuyhgvbnmkjhgbnmkjh",
  html: "<b>Hello</b>"
};

sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent!!!!!!!!!!!!!");
  })
  .catch(error => {
    console.log(error);
  });
