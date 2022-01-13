var express = require("express");
var router = express.Router();

router.get("/todos", function (req, res, next) {
    res.send("TODOS API");
});

module.exports = router;
