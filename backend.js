var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");

const session = require("express-session");
const FileStore = require("session-file-store")(session);

var app = express();

app.use(
  session({
    secret: "group here", // to encrypt
    store: new FileStore(),
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 30 * 60 * 1000 },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));

app.use("/", indexRouter);

module.exports = app;
