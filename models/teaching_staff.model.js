module.exports = (sequelize_config, Sequelize) => {
    const Teaching_staff = sequelize_config.define("teaching_staff", {
        teachers_name: {type: Sequelize.STRING, allowNull: false},
        qualification: {type: Sequelize.STRING, allowNull: false}
    });
    return Teaching_staff;
}