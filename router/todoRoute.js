const express = require("express");
const router = express.Router();
const todoController = require("../controller/todoController");

router.get("/", todoController.getAllTodo);
router.get("/:id", todoController.gettodoById);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);
router.post("/", todoController.addTodo);

module.exports = router;
