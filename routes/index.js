var express = require("express");
var router = express.Router();
const path = require("path");

const dbController = require("../db/DBController.js");

// get home page

router.post("/getPost", function (req, res) {
  const post = findPost(req.post);
  res.send(post);
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await dbController.findUserByName(username);

  if (!user) {
    res.send({ isLogin: false, message: "no user found" });
  }

  console.log(user);
  console.log(password);
  console.log(user.password == password);

  if (password == user.password) {
    req.session.loginUser = username;
    res.send({ isLogin: true, message: "success login as" + username });
  } else {
    res.send({ isLogin: false, message: "invalid password" });
  }
});

router.post("/signUp", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await dbController.findUserByName(username);

  if (user) {
    res.send({ isLogin: false, message: "user already exsist" });
  } else {
    const dbres = await dbController.create("users", req.body);
    console.log("create user res", dbres);
    req.session.loginUser = username;
    res.send({ isLogin: true, message: "success login as" + username });
  }
});

router.get("/isLogin", function (req, res) {
  console.log("username in session", req.session.loginUser);
  username = req.session.loginUser ? req.session.loginUser : null;
  res.send({ username: username });
});

router.get("/logout", async (req, res) => {
  console.log("logout: " + req.session);
  await req.session.destroy();
  console.log("logout: " + req.session);
  res.redirect("/");
});

router.post("/create", async (req, res) => {
  try {
    const colName = req.body.colName;
    const data = req.body.data;
    console.log(colName, data);
    await dbController.create(colName, data);
    res.send({ created: true, message: "successfully created data" });
  } catch {
    res.send({ created: false, message: "created error" });
  }
});

router.get("/getGroups", async (req, res) => {
  const dbres = await dbController.query("groups", {});
  console.log("qurey from db", dbres);
  res.send({ data: dbres });
});

router.get("*", (req, res) =>
  res.sendFile(path.resolve("front", "build", "index.html"))
);

module.exports = router;
