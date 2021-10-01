const express = require("express");
const env = require("dotenv");
const db = require("./Models");

const authRoute = require("./router/authRouter");
const todoRoute = require("./router/todoRoute");

const app = express();
env.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

app.use("/auth", authRoute);
app.use("/todo", todoRoute);

app.listen(5000, () => {
  console.log("Server is up and running at the port 5000");
});
