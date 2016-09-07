var db = require('../db');

var Attraction = require('./attraction');
var Day = require('./day');
var User = require('./user');

/*
user1 - Day1 		- Attraction1, Attraction2, Attraction 3
			- Day2		- Attraction1, Attraction2, Attraction 3
			- Day3		- Attraction1, Attraction2, Attraction 3
*/

// Day.belongsTo(Attraction, {through: 'day_attractions'});
Day.belongsTo(User);
Day.hasMany(Attraction);
Attraction.belongsTo(Day);
User.hasMany(Day);



module.exports = db;