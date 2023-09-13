const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roles: {
    type : Array,
    default: []
  },
  active: {
    type: Boolean,
    default: false
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ ...this }, config.get("jwtPrivateKey"));
  return token;
};

function validateUser(user) {
  const schema = Joi.object({
    _id: Joi.objectId(),
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

const User = mongoose.model("user", userSchema);

module.exports = {
  User,
  validateUser,
};
