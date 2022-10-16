const { Contact } = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  if (!req.body) {
    throw RequestError(400, "Missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = updateFavorite;
