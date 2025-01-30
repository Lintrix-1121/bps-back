module.exports =(sequelize_config, Sequelize) =>{
    const book = sequelize_config.define("book", {
        title: {type: Sequelize.STRING, allowNull: false},
        author: {type: Sequelize.STRING},
        quantity: {type: Sequelize.INTEGER },
        description: {type: Sequelize.STRING },
        
    });
    return book;

}