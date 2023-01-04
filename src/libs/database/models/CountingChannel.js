const db = require('../index');
const {Model, DataTypes} = require('sequelize');

class CountingServer extends Model {
    static associate(){

    }
}

CountingServer.init(
    {
        channelId:{
            type: DataTypes.STRING,
            unique: true,
        },
        currentNumber: {
            type: DataTypes.INTEGER,
        },
        maxCount: {
            type: DataTypes.INTEGER,
        },
        guildId: {
            type: DataTypes.STRING,
        },
    },
    {
        paranoid: true,
        sequelize: db,
        modelName: 'CountingChannel',
    }
);

module.exports = CountingServer;