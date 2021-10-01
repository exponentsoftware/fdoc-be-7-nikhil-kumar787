validateEmail = (email) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    email: {
      type: Sequelize.STRING,

      validate: {
        isEmailOrEmpty(val, next) {
          if (!val || val === "" || validateEmail(val)) {
            return next();
          } else {
            return next("email is invalid");
          }
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      required: true,
    },
    phone: {
      type: Sequelize.STRING,
      required: true,
    },
    role: {
      type: Sequelize.DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  });

  return User;
};
