const path = require("path");
const fs = require("fs/promises");

const { User } = require("../../models/users");

const { RequestError, editAvatar } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw RequestError(400, "Provide valid file [jpeg, jpg, png]");
  }
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  // rename avatar-file based on user id
  const extension = originalname.split(".").pop();
  const filename = `${_id}.${extension}`;

  const resultUpload = path.join(avatarsDir, filename);
  // move file to permanent folder
  await fs.rename(tempUpload, resultUpload);

  await editAvatar(resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL, status: "Update successful" });
};

module.exports = updateAvatar;
