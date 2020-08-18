const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/usersModel");

router.post("/", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${username}` });
      } else {
        res.status(401).json({ error: "Sorry, wrong username or password." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
