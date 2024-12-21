let { DataTypes, sequelize } = require("../lib/");
let track = sequelize.define("track", {
    name: DataTypes.TEXT,
    genre: DataTypes.TEXT,
    release_year: DataTypes.INTEGER,
    artist: DataTypes.TEXT,
    album: DataTypes.TEXT,
    duretion: DataTypes.INTEGER
});

module.exports = { track };