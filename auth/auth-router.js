const router = require("express").Router();
const bcrypt = require("bcryptjs"); // npm i bcryptjs
// const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
// const secrets = require("../config/secrets.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8); // Step 1
  user.password = hash; // Step 2

  Users.add(user)
    .then(saved => {
      req.session.loggedIn = true;
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      console.log("User: ", user);
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        req.session.username = user.username;

        // const token = generateToken(user);

        res
          .status(200)
          .json({ message: `Welcome ${user.username}!` /*,token*/ });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res
          .status(500)
          .json({ message: "Error while logging out, please try again" });
      } else {
        res.status(200).json({ message: "Successful logout" });
      }
    });
  } else {
    res.status(500).json({ message: "Please log in to continue" });
  }
});

// function generateToken(user) {
//   const payload = {
//     subject: user.id,
//     username: user.username
//   };
//   const options = {
//     expiresIn: "1d"
//   };
//   return jwt.sign(payload, secrets.jwtSecret, options);
// }

module.exports = router;
