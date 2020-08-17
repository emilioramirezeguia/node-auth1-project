const { route } = require("../users/usersRouter");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Login router is working!" });
});

module.exports = router;
