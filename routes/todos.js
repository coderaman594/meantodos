var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs(
    "mongodb+srv://coderaman594:3iDJvRcze0Q51Af5@cluster0.ffr5w.mongodb.net/meantodo_aman_dev?retryWrites=true&w=majority",
    ["todos"]
);

router.get("/todos", function (req, res, next) {
    db.todos.find(function (err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

module.exports = router;
