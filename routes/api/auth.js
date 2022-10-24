const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/users");

const { validateBody, isLoggedIn } = require("../../middlewares");
const { schemas } = require("../../models/users");

const router = express.Router();

router.post(
  "/signup",
  validateBody(schemas.signupSchema),
  ctrlWrapper(ctrl.signup)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", isLoggedIn, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", isLoggedIn, ctrlWrapper(ctrl.logout));

router.patch(
  "/",
  isLoggedIn,
  validateBody(schemas.subsSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
