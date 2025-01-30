module.exports = (sequelize_config, Sequelize) => {
    const Challenges = sequelize_config.define("challenge", {
        challenge: {type: Sequelize.STRING, allowNull: false}
    });
    return Challenges;
}