const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize_config = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool:{
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
     }
);
const db ={};
db.Sequelize = Sequelize;
db.sequelize_config =sequelize_config;

db.admins = require("./admins.models.js")(sequelize_config, Sequelize);
db.admissions = require("./admission.model.js")(sequelize_config, Sequelize);
db.applications =require("./application.model.js")(sequelize_config,Sequelize);
db.marks = require("./marks.model.js")(sequelize_config, Sequelize);
db.events = require("./events.model.js")(sequelize_config, Sequelize);
db.emails = require("./emails.model.js")(sequelize_config, Sequelize);
db.reports = require("./reports.model.js")(sequelize_config, Sequelize);
db.teaching_staff = require("./teaching_staff.model.js")(sequelize_config, Sequelize);
db.ntstaff = require("./ntstaff.models.js")(sequelize_config, Sequelize);
db.performance = require("./performance.model.js")(sequelize_config, Sequelize);
db.mgt_committee = require("./mgt_committee.model.js")(sequelize_config, Sequelize);
db.pta_committee = require("./pta_committee.model.js")(sequelize_config, Sequelize);
db.challenges = require("./challenges.models.js")(sequelize_config, Sequelize);
db.achievements = require("./achievements.model.js")(sequelize_config, Sequelize);
db.dbset = require("./note.js")(sequelize_config, Sequelize);
db.images = require("./Image.model.js")(sequelize_config, Sequelize);
db.resources = require("./resources.model.js")(sequelize_config, Sequelize);
db.marks2 = require("./marks2.model.js")(sequelize_config, Sequelize);
db.happenings = require("./happening.mode.js")(sequelize_config, Sequelize);
db.pupils = require("./pupil.model.js")(sequelize_config, Sequelize);
db.books = require("./book.model.js")(sequelize_config, Sequelize);

db.results = require("./results.model.js")(sequelize_config, Sequelize);
db.signature = require("./signature.model.js")(sequelize_config, Sequelize);


module.exports =db;