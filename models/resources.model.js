module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("file", {
        file_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        file_path: {
            type: Sequelize.STRING,
            allowNull: false
        },
        file_size: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        uploaded_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    return File;
};
