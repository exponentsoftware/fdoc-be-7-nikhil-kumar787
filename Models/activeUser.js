module.exports = (sequelize, Sequelize) => {
  const ActiveUser = sequelize.define(
    "activeuser",
    {
      day: {
        type: Sequelize.INTEGER,
        required: true,
      },
      week: {
        type: Sequelize.STRING,
      },
      month: {
        type: Sequelize.STRING,
        required: true,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
    },
    { timestamps: true }
  );

  return ActiveUser;
};
