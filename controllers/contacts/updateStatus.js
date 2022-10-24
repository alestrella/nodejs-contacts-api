const { Contact } = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404);
  }
  res.json(result, { status: "Update successful" });
};

module.exports = updateFavorite;
