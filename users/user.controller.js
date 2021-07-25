const { Router } = require("express");
const { authService } = require("../auth/auth.service");
const { authorize } = require("../auth/authorize.middleware");
const { asyncWrapper } = require("../helpers/async-wrapper");
const { prepareUser } = require("./user.serializer");
const router = Router();

router.get("/current", authorize, (req, res, next) => {
  res.status(200).send(prepareUser(req.user));
});

router.post(
  "/logout",
  authorize,
  asyncWrapper(async (req, res, next) => {
    await authService.logOut(req.user);
    res.status(204).json("The user is logged out");
  })
);

router.post("/avatars", authorize, upload.single("avatar"), (req, res, next) => {
  res.send();
});

exports.usersController = router;
