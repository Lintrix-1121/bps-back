module.exports = (sequelize_config, Sequelize) => {
    const Non_teaching_staff = sequelize_config.define("non_teaching_staff", {
        staff_name: {type: Sequelize.STRING, allowNull: false}
    })
}