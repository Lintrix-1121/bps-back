module.exports = (sequelize_config, Sequelize) =>{
    const email = sequelize_config.define("email", {
        name: {type: Sequelize.STRING, allowNull: false},
        email: {type: Sequelize.STRING, allowNull: false},
        message: {type: Sequelize.STRING, allowNull: false}
    });
    return email;
}