const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/usersModel");

// Register a user
router.post("/register", (req, res) => {
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

// Login a user
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true;

        res
          .status(200)
          .json({ message: `Welcome ${username}`, session: req.session });
      } else {
        res.status(401).json({ error: "Sorry, wrong username or password." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Logout a user
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res
          .status(500)
          .json({ error: "Sorry, we couldn't log you out. Please try again!" });
      } else {
        res
          .status(200)
          .json({ message: "Logged out successfully. See you soon!" });
      }
    });
  } else {
    res.status(200).json({ message: "You're already logged out." });
  }
});

module.exports = router;
