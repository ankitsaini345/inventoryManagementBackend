const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(400).json("Bad Request!! Missing Auth token header.");
  }

  try {
    const payload = jwt.verify(token, config.jwt.secret);
    req.user = {
      email: payload.email,
      roles: payload.roles,
    };
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError)
      return res.status(401).json('Auth Token Expired');
    else if (err instanceof jwt.JsonWebTokenError)
      return res.status(401).json('Auth Token Error');
    else
      return res.status(500).json('Error in Verifying Token. Please login again');
  }
};
