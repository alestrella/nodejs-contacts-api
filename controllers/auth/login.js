const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/users");

const { RequestError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passwordCompare = bcrypt.compare(password, user.password);

  if (!user || !passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email, subscrption: user.subscription, avatarURL: user.avatarURL },
  });
};

module.exports = login;
