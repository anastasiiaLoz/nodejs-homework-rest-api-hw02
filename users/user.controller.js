const { Router } = require("express");
const { authService } = require("../auth/auth.service");
const { authorize } = require("../auth/authorize.middleware");
const { asyncWrapper } = require("../helpers/async-wrapper");
const { prepareUser } = require("./user.serializer");
const router = Router();
const { upload, compressImage } = require("../users/user.avatar");

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

router.patch(
  "/avatars",
  authorize,
  upload.single("avatar"),
  compressImage,
  asyncWrapper(async (req, res, next) => {
    const url = await authService.updateAvatar(req);
    res.status(200).send(url);
  })
);

router.get(
  "/verify/:verificationToken",
  asyncWrapper(async (req, res, next) => {
    await authService.verifyEmail(req.params.verificationToken);
    res.status(200).json("Verification successful");
  })
);

router.post(
  "/verify",
  asyncWrapper(async (req, res, next) => {
    const verify = await authService.reverifyEmail(req.body.email);
    if (verify === true) {
      return res.status(400).json("Verification has already been passed");
    }
    res.status(200).json({ message: "Verification letter sent" });
  })
);

exports.usersController = router;
