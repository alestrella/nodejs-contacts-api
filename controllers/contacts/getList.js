const { Contact } = require("../../models/contacts");

const getList = async (req, res) => {
  const result = await Contact.find({});
  res.json(result);
};

module.exports = getList;
