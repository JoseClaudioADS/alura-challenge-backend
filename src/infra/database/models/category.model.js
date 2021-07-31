const { DataTypes } = require('sequelize');
const sequelize = require('..');

const Category = sequelize.define(
    'Category',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Category;
