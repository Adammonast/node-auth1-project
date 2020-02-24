const router = require("express").Router();
const bcrypt = require("bcryptjs");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const restricted = require("../auth/restricted");

router.use("/auth", authRouter);
router.use("/users", restricted, usersRouter);

router.get("/hash", (req, res) => {
  // read the authentication header
  const authentication = req.headers.authentication; // how to read the header

  //hash the value from the header
  const hash = bcrypt.hashSync(authentication, 8); // how to use bycryptjs to hash the authentication value

  res.json({ originalValue: authentication, hashedValue: hash });

  // "$2a$13$BNs9jBqiuQamPTcZsF5/Vev11miHCITetX/2GQ.T0hb/0EFLOfIKi"
  // "$2a$13$q2JY4jB08jVZkBoh/jwlGOYWm4AdWyOTeixYTvcgsDujDZhb9rTvK"
});

router.get("/", (req, res) => {
  res.json({ api: "It's alive" });
});

module.exports = router;
