const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Users router works!" });
});

module.exports = router;
