var express = require("express");
var router = express.Router();
const path = require("path");

const dbController = require("../db/DBController.js");

// get home page

router.post("/getPost", function (req, res) {
  const post = findPost(req.post);
  res.send(post);
});

router.get("/getUser", async (req, res) => {
  const user = await dbController.findUserByName("tiange");
  res.send(user);
});

router.get("*", (req, res) =>
  res.sendFile(path.resolve("front", "build", "index.html"))
);

module.exports = router;
