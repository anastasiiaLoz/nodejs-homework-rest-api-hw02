const { Router } = require("express");
const { authorize } = require("../auth/authorize.middleware");
const { prepareUser } = require("./user.serializer");
const router = Router();

router.get("/current", authorize, (req, res, next) => {
  res.status(200).send(prepareUser(req.user));
});

router.post("/logout", authorize, (req, res, next) => {
  const user = req.user.deleteToken(req.token, (err, user) => {
    if (err) return err;
    res.status(204).json("Successful Logout");
  });
});

exports.usersController = router;

// app.get("/api/logout", auth, function(req, res) {
//   req.user.deleteToken(req.token, (err, user) => {
//     if (err) return res.status(400).send(err);
//     res.sendStatus(200);
//   });
// });
