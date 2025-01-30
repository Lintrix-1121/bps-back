module.exports = (sequelize_config, Sequelize) => {
    const report = sequelize_config.define("report", {
        pupils_name: { type: Sequelize.STRING, allowNull: false },
        eng: { type: Sequelize.INTEGER, allowNull: false },
        eng_grade: { type: Sequelize.ENUM('D1', 'D2', 'C3', 'C4', 'C5', 'C6', 'P7', 'P8', 'F9') },
        math: { type: Sequelize.INTEGER, allowNull: false },
        math_grade: { type: Sequelize.ENUM('D1', 'D2', 'C3', 'C4', 'C5', 'C6', 'P7', 'P8', 'F9') },
        sci: { type: Sequelize.INTEGER, allowNull: false },
        sci_grade: { type: Sequelize.ENUM('D1', 'D2', 'C3', 'C4', 'C5', 'C6', 'P7', 'P8', 'F9') },
        sst: { type: Sequelize.INTEGER, allowNull: false },
        sst_grade: { type: Sequelize.ENUM('D1', 'D2', 'C3', 'C4', 'C5', 'C6', 'P7', 'P8', 'F9') },
        total: { type: Sequelize.INTEGER, allowNull: false },
        average: { type: Sequelize.FLOAT, allowNull: false },
    });
    return report;
};
