var express = require("express");
var router = express.Router();

// get home page


router.post("/getPost", function (req, res) {
  const post = findPost(req.post);
  res.send(post);
});

router.get("*", function(req, res)) {
   res.sendFile(path.resolve("front", "public", "index.html"))
}

module.exports = router;
