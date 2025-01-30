module.exports = (sequelize_config, Sequelize) =>{
    const PTA_committee = sequelize_config.define("pta_committee", {
        name: {type: Sequelize.STRING, allowNull: false}
    });
    return PTA_committee;
}