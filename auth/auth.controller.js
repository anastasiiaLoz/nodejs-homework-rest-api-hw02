const { Router } = require("express");
const router = Router();
const { asyncWrapper } = require("../helpers/async-wrapper");
const { signUpSchema, logInSchema } = require("../auth/auth.schemes");
const { validateSignUp, validateLogIn } = require("../validation/contacts.validation");
const { authService } = require("./auth.service");
const { prepareUser } = require("../users/user.serializer");
const { prepareUserWithToken } = require("./auth.serializer");

router.post(
  "/signup",
  validateSignUp(signUpSchema),
  asyncWrapper(async (req, res, next) => {
    const user = await authService.signUp(req.body);
    return res.status(201).send({ user: prepareUser(user) });
  })
);

router.post(
  "/login",
  validateLogIn(logInSchema),
  asyncWrapper(async (req, res, next) => {
    const userWithToken = await authService.logIn(req.body);
    return res.status(200).send(prepareUserWithToken(userWithToken));
  })
);

exports.authController = router;
