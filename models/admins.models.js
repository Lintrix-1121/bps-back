
module.exports =(sequelize_config, Sequelize) =>{
    const admin = sequelize_config.define("admin", {
        name: {type: Sequelize.STRING, allowNull: false},
        email: {type: Sequelize.STRING, allowNull: false},
        password: {type: Sequelize.STRING, allowNull: false},
        deparment: {type: Sequelize.STRING, allowNull:false }
    });
    return admin;

}