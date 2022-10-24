const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveError } = require("../helpers");

const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

const subsPlans = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegex,
      unique: true,
    },
    password: {
      type: String,
      minLenght: [8, "Passwords must be at least 8 characters long."],
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: subsPlans,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

const signupSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).required(),
});

const subsSchema = Joi.object({
  subscription: Joi.string().valid(...subsPlans),
});

const schemas = {
  signupSchema,
  loginSchema,
  subsSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
