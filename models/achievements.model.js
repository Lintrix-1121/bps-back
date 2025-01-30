module.exports = (sequelize_config, Sequelize) => {
    const Achievement = sequelize_config.define("achievements", {
        achievement: {type: Sequelize.STRING, allowNull: false},
    });
    return Achievement;
}