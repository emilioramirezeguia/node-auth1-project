const router = require("express").Router();
const Users = require("./usersModel");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ users: users });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
