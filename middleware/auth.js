const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = function (req, res, next) {
  console.log(req.method, req.originalUrl);
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
    const payload = jwt.verify(token, config.jwt.secret);
    req.user = {
      email: payload.email,
      roles: JSON.parse(payload.roles),
    };
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError)
      return res.status(401).json({
        error: true,
        message: err.message,
        expiredToken: true,
      });
    else if (err instanceof jwt.JsonWebTokenError)
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
};
