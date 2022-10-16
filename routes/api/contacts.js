const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getList));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.statusSchema),
  ctrlWrapper(ctrl.updateStatus)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
