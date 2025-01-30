
module.exports =(sequelize_config, Sequelize) =>{
    const dbset =sequelize_config.define("dbset",{
        name: {type: Sequelize.STRING}
    });
    return dbset;
}