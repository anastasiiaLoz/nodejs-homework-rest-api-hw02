const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cowsay = require("cowsay");

const mongodb = process.env.MONGODB_URI;
mongoose.connect(
  mongodb,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  },
  function(err) {
    if (err) {
      console.log("Something went wrong. Database is not connected.");
      process.exit(1);
    }
    console.log(
      cowsay.say({
        text: "Database connection successfull.",
        e: "oO",
        T: "U"
      })
    );
  }
);

const contactsRouter = require("./routes/api/contacts.controller");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
