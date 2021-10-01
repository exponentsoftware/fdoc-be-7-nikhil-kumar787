const db = require("../Models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

let startDate = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const day = startDate.getDate();
const month = months[startDate.getMonth()]; // 0 to 11 index
const month1 = startDate.getMonth();
const year = startDate.getFullYear();
const fullDate = day + " " + month + " " + year;
const currentDate = month1 + 1 + "/" + day + "/" + year;

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.signup = async (req, res, next) => {
  const { email, password, name, role = "user", phone } = req.body;

  try {
    const user = await db.user.findOne({ where: { email: email } });

    if (!user) {
      const newUser = new db.user({
        email,
        password,
        name,
        role,
        phone,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            console.log(newUser);

            res.status(200).json({ message: "User Registered Successfully" });
          });
        });
      });
    } else {
      res.send("alredy email exist");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.signin =
  ("/login",
  async function (req, res, next) {
    const { email, password } = req.body;

    //Check If User Exists
    // await db.user.find({ email: email }).exec((err, user) => {
    const user = await db.user.findOne({ where: { email: email } });
    console.log("email", email);
    console.log("user", user);
    if (user) {
      console.log("lll", user);
      bcrypt.compare(password, user.password, async (err, isMatch) => {
        console.log(user);
        if (err) throw err;
        if (isMatch) {
          console.log(user.id);
          const token = generateJwtToken(user.id, user.role);
          const active_usr = await db.activeuser.findAndCountAll({
            where: { userId: user.id },
          });
          console.log("active usr", active_usr.count);
          if (active_usr.count == 0) {
            console.log("Active user block", active_usr.count);
            const activeuser = new db.activeuser({
              day: day,
              month: month,
              userId: user.id,
            });
            activeuser.save().then((active) => {
              res.status(200).json({ token, userid: user.id });
            });
          } else {
            res.status(200).json({ token, userid: user.id });
          }
        } else {
          return res.status(403).json({ message: "Wrong Password" });
        }
      });
    }
  });
