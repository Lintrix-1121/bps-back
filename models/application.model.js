
module.exports =  (sequelize_config, Sequelize) =>{
    const application = sequelize_config.define('application', {
        pupils_name: {type: Sequelize.STRING, allowNull: false},
        class: {type: Sequelize.STRING, allowNull:false},
        previous_school: {type: Sequelize.STRING, allowNull: false},
        age: {type: Sequelize.INTEGER, allowNull:false},
        parents_name: {type: Sequelize.STRING, allowNull: false},
        contact: {type: Sequelize.INTEGER, allowNull:false}
    });
    return application;
}