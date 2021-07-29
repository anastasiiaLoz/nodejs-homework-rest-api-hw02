// dotenv.config({ path: path.join(__dirname, ".env") });

require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey("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");
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
