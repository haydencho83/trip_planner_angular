var Sequelize = require('sequelize');
var db = require('../db');


var Attraction = db.define('attraction', {
	name: Sequelize.STRING,
	placeId: Sequelize.STRING,
	geometry: Sequelize.JSON
})


// var Attraction = db.define('attraction', {
// 	name: Sequelize.STRING,
// 	category: Sequelize.ARRAY(Sequelize.STRING),
// 	open: Sequelize.STRING,
// 	price: Sequelize.FLOAT,
// 	rating: Sequelize.FLOAT,
// 	photos: Sequelize.ARRAY(Sequelize.STRING),
// 	website: Sequelize.STRING,
// 	number: Sequelize.STRING,
// 	address: Sequelize.STRING,
// 	placeId: Sequelize.STRING,
// 	geometry: Sequelize.JSON
// });

module.exports = Attraction;
