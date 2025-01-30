const dbConfig = require("../config/db.config.js");

const Sequelize = require('sequelize');
const sequelize_config = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool:{
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db = {};
dbConfig.Sequelize = Sequelize;
dbConfig.sequelize_config = sequelize_config;

db.admins = require("./admins.models.js")(sequelize_config, Sequelize);
db.admission = require("./admission.model.js")(sequelize_config, Sequelize);
db.application = require("./application.model.js")(sequelize_config, Sequelize);
db.marks = require("./marks.model.js")(sequelize_config,Sequelize);


module.exports = db;