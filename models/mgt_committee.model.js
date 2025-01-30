module.exports = (sequelize_config, Sequelize) =>{
    const Committee_member = sequelize_config.define("committee_member", {
        committee_member: {type: Sequelize.STRING, allowNull: false}
    });
    return Committee_member;
}