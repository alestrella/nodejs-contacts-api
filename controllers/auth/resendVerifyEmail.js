const { BASE_URL } = process.env;

const { User } = require("../../models/users");

const { RequestError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (!user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const verificationLink = `${BASE_URL}/api/users/verify/${user.verificationToken}`;

  await sendEmail(email, verificationLink);
  res.json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
