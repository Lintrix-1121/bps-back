module.exports =(sequelize_config, Sequelize) =>{
    const result = sequelize_config.define("result", {
        pupils_name: {type: Sequelize.STRING, allowNull: false},
        eng: {type: Sequelize.STRING},
        math: {type: Sequelize.STRING},
        sci: {type: Sequelize.STRING },
        sst: {type: Sequelize.STRING },
        aggregate: {type: Sequelize.INTEGER },
        division: {type: Sequelize.STRING },
        
    });
    return result;

}