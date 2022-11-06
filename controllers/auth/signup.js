const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { BASE_URL } = process.env;

const { User } = require("../../models/users");

const { RequestError, sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "250" }, true);
  const verificationToken = uuidv4();
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const verificationLink = `${BASE_URL}/api/users/verify/${verificationToken}`;

  const mail = {
    to: email,
    subject: "Confirm Your Email",
    text: `To confirm your email address, please click on the following link: <a target="_blank" href="${verificationLink}">${verificationLink}</a>`,
    html: `<p>To confirm your email address, please click on the following link: <a target="_blank" href="${verificationLink}">${verificationLink}</a></p>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL: result.avatarURL,
    },
  });
};

module.exports = signup;
