const Joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const { User, validateUser } = require("../models/user");
const config = require("../config/config");

const validateRequest = (reqBody) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .pattern(/^[a-zA-Z0-9]{3,30}$/),
  });
  return schema.validate(reqBody);
};

router.post("/login", async (req, res) => {
  const { error } = validateRequest(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json("User not found !!");

  if (user.active == false) return res.status(401).json("User Not Active !!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword)
    return res.status(401).json("Invalid Email or Password!!");

  delete user.password;

  const authToken = jwt.sign(
    { email: user.email, roles: JSON.stringify(user.roles) },
    config.jwt.secret,
    { expiresIn: config.jwt.expiry }
  );

  return res.status(200).json({
    authToken,
    userId: user.email
  });
});

router.post("/signup", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).json(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json("User already exists");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(8);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  return res.status(201).json(_.pick(user, ["name", "email", "_id"]));
});

router.get("/refresh", (req, res) => {
  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).json({
      error: true,
      message: "Bad Request!! Missing Auth token header.",
    });
  }

  const token = tokenHeader.split(" ")[1];

  try {
    let payload = jwt.decode(token, config.jwt.secret);
    delete payload.iat;
    delete payload.exp;
    const newToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiry,
    });
    return res.status(200).json({
      newToken,
    });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError)
      return res.status(401).json({
        error: true,
        message: err.message,
      });
    else
      return res.status(500).json({
        error: true,
        message: err.message,
      });
  }
});

module.exports = router;
