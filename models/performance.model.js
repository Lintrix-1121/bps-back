module.exports = (sequelize_config, Sequelize) =>{
    const Performance = sequelize_config.define("performance", {
        year: {type: Sequelize.INTEGER, allowNull: false},
        total: {type: Sequelize.INTEGER, allowNull: false},
        div1: {type: Sequelize.INTEGER, allowNull: false},
        div2: {type: Sequelize.INTEGER, allowNull: false},
        div3: {type: Sequelize.INTEGER, defaultValue: 0},
        div4: {type: Sequelize.INTEGER, defaultValue: 0},
        U: {type: Sequelize.INTEGER, defaultValue: 0},
        X: {type: Sequelize.INTEGER, defaultValue: 0}
    });
    return Performance;
}