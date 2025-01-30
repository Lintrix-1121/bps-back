module.exports = (sequelize_config, Sequelize) => {
    const Event = sequelize_config.define("event", {
        event_name: { type: Sequelize.STRING, allowNull: false },
        venue: { type: Sequelize.STRING, allowNull: false },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            get() {
                const rawValue = this.getDataValue('date');
                return rawValue ? rawValue.toISOString().split('T')[0] : null; // Returns only the date part
            }
        },
    });
    
    return Event;
};
