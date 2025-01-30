module.exports = (sequelizze_config, Sequelize) => {
    const admission = sequelizze_config.define("admission", {
        pupils_name: {type: Sequelize.STRING, allowNull: false},
        class: {type: Sequelize.STRING, allowNull: false},
        contact: {type: Sequelize.INTEGER, allowNull: false}
    });
    return admission;
}