const { Contact } = require("../../models/contacts");

const getList = async (req, res) => {
  const { _id: owner } = req.user;
  const { page, limit, favorite } = req.query;

  const skip = (page - 1) * limit; // pagination

  const result = await Contact.find(
    { owner, favorite: { $eq: favorite } },
    "-createdAt -updatedAt",
    { skip, limit }
  ).populate("owner", "email");
  res.json(result);
};

module.exports = getList;
