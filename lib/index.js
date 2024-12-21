let sq = require('sequelize');
let sequelize = sq.Sequelize('sqlite./database.sqlite');
module.exports = { DataTypes: sq.DataTypes, sequelize };
