// Import npm packages
const express = require("express");
const session = require("express-session");

// Import routers && middleware
const usersRouter = require("./users/usersRouter");
const authRouter = require("./auth/authRouter");
const protected = require("./auth/protectedMW");

const server = express();
const sessionConfig = {
  name: "monster",
  secret: "keep it secret, keep it safe",
  cookie: {
    maxAge: 1000 * 60 * 10, // session expires after 10 minutes
    secure: false, // if true cookie is only sent over https
    httpOnly: true, // JavaScript can't touch cookie
  },
  resave: false,
  saveUninitialized: false, // GDPR Compliance, the client should drive this
};

// Use middleware
server.use(express.json());
server.use(session(sessionConfig));

server.get("/api", (req, res) => {
  res.status(200).json({ message: "It's working... it's working!" });
});

server.use("/api/users", protected, usersRouter);

server.use("/api/auth", authRouter);

const port = 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
