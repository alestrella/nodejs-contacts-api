const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/users");

const { validateBody } = require("../../middlewares");
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

module.exports = router;
