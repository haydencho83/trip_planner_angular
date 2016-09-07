var Sequelize = require('sequelize');
var db = require('../db');

var Place = db.define('place', {
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  phone: Sequelize.STRING,
  location: Sequelize.ARRAY(Sequelize.DOUBLE)
});

module.exports = Place;
