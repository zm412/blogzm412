module.exports = {
  HOST: "db",
  USER: "zm412",
  PASSWORD: "tazhbaeva1",
  DB: "capstone_db",
  dialect: "postgres",
  PORT: "5432",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
