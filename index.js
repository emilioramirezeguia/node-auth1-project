const express = require("express");
const usersRouter = require("./users/usersRouter");
const registerRouter = require("./register/registerRouter");
const loginRouter = require("./login/loginRouter");

const server = express();
server.use(express.json());

server.get("/api", (req, res) => {
  res.status(200).json({ message: "It's working... it's working!" });
});

server.use("/api/users", usersRouter);

server.use("/api/register", registerRouter);
server.use("/api/login", loginRouter);

const port = 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
