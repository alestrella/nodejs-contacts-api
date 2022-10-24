const { User } = require("../../models/users");

const { RequestError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!result) {
    throw RequestError(404);
  }

  const { email, subscription } = result;

  res.json({ user: { email, subscription }, status: "Update successful" });
};

module.exports = updateSubscription;
