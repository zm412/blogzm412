const dbConfig = require("../db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const dbase = {};
dbase.Sequelize = Sequelize;
dbase.sequelize = sequelize;
dbase.users = require("./user.model.js")(sequelize, Sequelize);
dbase.posts = require("./post.model.js")(sequelize, Sequelize);
module.exports = dbase;
