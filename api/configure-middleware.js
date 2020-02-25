const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const sessionConfig = {
  name: "batman", // defaults to sid
  secret: "keep it secret, keep it safe!",
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in production,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false // GDPR Laws against setting cookies automatically, change dynamically with permission
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig));
};
