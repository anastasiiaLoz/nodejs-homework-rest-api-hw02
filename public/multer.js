const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "uploads" });

const app = express();

app.post("/avatars", upload.single("avatar"), (req, res, next) => {
  res.send();
});
