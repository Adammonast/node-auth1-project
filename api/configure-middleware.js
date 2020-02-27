const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const knex = require("../database/dbConfig"); // needed for storing sessions in the database
// npm install connect-session-knex
const KnexStore = require("connect-session-knex")(session); // remember to curry and pass the session

const sessionConfig = {
  name: "batman", // unless named, value defaults to "sid"
  secret: "keep it safe",
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in production,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false, // GDPR Laws against setting cookies automatically, change dynamically with permission
  // Remember the "new" keyword
  store: new KnexStore({
    knex,
    tablename: "sessions",
    createtable: true,
    sidfieldname: "sid", // default, able to change
    clearInterval: 1000 * 60 * 15
  })
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig));
  // Pass in sessionConfig Obj into
  server.use(session(sessionConfig)); // turn on session middleware
  // at this pont there is a req.session object created by express-session
};
