module.exports = (sequelize_config, Sequelize) => {
    const Image = sequelize_config.define("image", {
        image_url: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        alt_text: {
            type: Sequelize.STRING,
            allowNull: true
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });
    return Image;
};
