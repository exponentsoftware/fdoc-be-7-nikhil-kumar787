const db = require("../Models");
const User = db.user;
const Todo = db.todo;
const asyncHandler = require("express-async-handler");

exports.getAllTodo = asyncHandler(async (req, res) => {
  const todos = await Todo.findAll({
    limit: 10,
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json({ todos });
});

exports.gettodoById = async (req, res) => {
  let id = req.params.id;

  const { page = 1, limit = 10 } = req.query; ///////////Pagination

  const todo = await Todo.findAndCountAll({
    where: { userId: id },
    limit: limit,
    offset: page,
  });

  const record_count = todo.rows.length;
  res.status(200).json({ total: record_count, todo, pageNo: page });
};

exports.addTodo = async (req, res) => {
  const { userid, title, category } = req.body;

  const user = await User.findOne({ where: { id: userid } });
  if (user) {
    const todo = new Todo({
      userId: userid,
      title,
      category,
    });

    todo.save().then((todo, error) => {
      if (todo) {
        return res.status(201).json({
          message: "Successfully addded a Todo",
        });
      }
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
    });
  }
};

exports.updateTodo = async (req, res) => {
  let id = req.params.id;
  const { title, category, status } = req.body;

  Todo.update(
    {
      title: title,
      category: category,
      status: status,
    },
    { where: { id: id } }
  )
    .then((result) => res.status(200).json({ message: result }))
    .catch((err) => res.status(400).json({ error: err }));
};

exports.deleteTodo = async (req, res) => {
  let id = req.params.id;

  const todo = await Todo.findOneAndDelete({ where: { id: id } });

  if (todo) {
    res.status(201).json({ message: "Todo removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
