var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs(
    "mongodb+srv://coderaman594:3iDJvRcze0Q51Af5@cluster0.ffr5w.mongodb.net/meantodo_aman_dev?retryWrites=true&w=majority",
    ["todos"]
);
// Get ToDos
router.get("/todos", function (req, res, next) {
    db.todos.find(function (err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

// Get Single ToDo
router.get("/todo/:id", function (req, res, next) {
    db.todos.findOne(
        {
            _id: mongojs.ObjectId(req.params.id),
        },
        function (err, todo) {
            if (err) {
                res.send(err);
            } else {
                res.json(todo);
            }
        }
    );
});

// Save ToDo
router.post("/todo/", function (req, res, next) {
    var todo = req.body;
    if (!todo.next || !(todo.isCompleted + "")) {
        res.status("400");
        res.json({ error: "Invalid ToDo Data" });
    } else {
        db.save(todo, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Update ToDo
router.put("/todo/:id", function (req, res, next) {
    var todo = req.body;
    var updObj = {};
    if (todo.isCompleted) {
        updObj.isCompleted = todo.isCompleted;
    }
    if (todo.text) {
        updObj.text = todo.text;
    }

    if (!updObj) {
        res.status("400");
        res.json({ error: "Invalid ToDo Data" });
    } else {
        db.todos.update(
            {
                _id: mongojs.ObjectId(req.params.id),
            },
            updObj,
            {},
            function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            }
        );
    }
});

// Delete ToDo
router.delete("/todo/:id", function (req, res, next) {
    db.todos.remove(
        {
            _id: mongojs.ObjectId(req.params.id),
        },
        updObj,
        "",
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        }
    );
});

module.exports = router;
