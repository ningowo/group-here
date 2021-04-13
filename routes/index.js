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

/*
Nice start on the routing here, especially with the redirect on any paths that do not match. 
Adding some validation on requests and responses could be helpful.
*/

router.get("*", (req, res) =>
  res.sendFile(path.resolve("front", "build", "index.html"))
);

module.exports = router;
