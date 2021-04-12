var express = require("express");
var router = express.Router();

// get home page

router.post("/getPost", function (req, res) {
  const post = findPost(req.post);
  res.send(post);
});

router.get("*", (req, res) =>
  res.sendFile(path.resolve("front", "build", "index.html"))
);

module.exports = router;
