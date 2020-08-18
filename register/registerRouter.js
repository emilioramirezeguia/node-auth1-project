const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/usersModel");

router.post("/", (req, res) => {
  const { username, password } = req.body;

  const rounds = 8;
  const hash = bcrypt.hashSync(password, rounds);

  Users.add({ username, password: hash })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
