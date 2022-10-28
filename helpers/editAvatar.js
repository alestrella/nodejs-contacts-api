const Jimp = require("jimp");

const editAvatar = async (file) => {
  const img = await Jimp.read(file);
  await img.autocrop().cover(250, 250).quality(75).writeAsync(file);
};

module.exports = editAvatar;
