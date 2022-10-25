const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/contacts");

const { validateBody, isLoggedIn } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", isLoggedIn, ctrlWrapper(ctrl.getList));

router.get("/:contactId", isLoggedIn, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  isLoggedIn,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:contactId",
  isLoggedIn,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isLoggedIn,
  validateBody(schemas.statusSchema),
  ctrlWrapper(ctrl.updateStatus)
);

router.delete("/:contactId", isLoggedIn, ctrlWrapper(ctrl.removeById));

module.exports = router;
