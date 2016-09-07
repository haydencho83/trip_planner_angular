var Sequelize = require('sequelize');
var db = require('../db');

var Day = db.define('day', {
    day: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Day;