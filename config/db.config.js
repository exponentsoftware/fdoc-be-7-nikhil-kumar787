module.exports = {
  HOST: "localhost",
  USER: "samnik",
  PASSWORD: "samnik787",
  DB: "samnikdb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
