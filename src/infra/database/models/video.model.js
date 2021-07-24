const { DataTypes } = require('sequelize');
const sequelize = require('../');

const Video = sequelize.define(
    'Video',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Video;
