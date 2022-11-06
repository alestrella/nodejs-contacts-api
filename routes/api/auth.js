const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrlAuth = require("../../controllers/auth");
const ctrlUser = require("../../controllers/users");

const { validateBody, isLoggedIn, upload } = require("../../middlewares");
const { schemas } = require("../../models/users");

const router = express.Router();

router.post(
  "/signup",
  validateBody(schemas.signupSchema),
  ctrlWrapper(ctrlAuth.signup)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrlAuth.verify));

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrlAuth.login)
);

router.get("/current", isLoggedIn, ctrlWrapper(ctrlAuth.getCurrent));

router.get("/logout", isLoggedIn, ctrlWrapper(ctrlAuth.logout));

router.patch(
  "/subscription",
  isLoggedIn,
  validateBody(schemas.subsSchema),
  ctrlWrapper(ctrlUser.updateSubscription)
);

router.patch(
  "/avatars",
  isLoggedIn,
  upload.single("avatar"),
  ctrlWrapper(ctrlUser.updateAvatar)
);

module.exports = router;
