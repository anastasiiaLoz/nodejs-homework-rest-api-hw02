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

exports.usersController = router;
