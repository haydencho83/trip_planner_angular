'use strict';

var Sequelize = require('sequelize');
var db = require('../db');

var User = db.define('user', {
  name: Sequelize.STRING,
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-photo.jpg'
  },
  phone: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: Sequelize.STRING,
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  googleId: Sequelize.STRING,
  twitterId: Sequelize.STRING,
  githubId: Sequelize.STRING
});

module.exports = User;