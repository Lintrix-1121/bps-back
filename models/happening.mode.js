module.exports = (sequelize_config, Sequelize) => {
    const Happening = sequelize_config.define("happenings", {
        title: { type: Sequelize.STRING, allowNull: false},
        date: {type: Sequelize.DATE, allowNull: false},
        description: {type: Sequelize.STRING, allowNull: false}

    });
    return Happening;
}