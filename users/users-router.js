const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(users => {
      if (user) {
        res
          .status(404)
          .json({ message: "User with speicified ID does not exist" });
      } else {
        res.status(200).json(users);
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500).json({ message: "Failed to retrieve user" });
    });
});

module.exports = router;
