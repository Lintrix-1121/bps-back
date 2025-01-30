module.exports =(sequelize_config, Sequelize) =>{
    const pupil = sequelize_config.define("pupil", {
        pupils_name: {type: Sequelize.STRING, allowNull: false},
        level: {type: Sequelize.ENUM('P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7')},
        gender: {type: Sequelize.ENUM('Male', 'Female')},
        age: {type: Sequelize.INTEGER },
        LIN: {type: Sequelize.STRING },
        contact: {type: Sequelize.STRING, allowNull:false },
        status: {type: Sequelize.ENUM('Active', 'Inactive') }
    });
    return pupil;

}