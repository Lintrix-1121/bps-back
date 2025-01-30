module.exports = (sequelize_config, Sequelize) =>{
    const Ntstaff = sequelize_config.define("ntstaff", {
        ntstaff_name: {type: Sequelize.STRING, allowNull: false}
    });
    return Ntstaff;
}