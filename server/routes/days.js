var express = require('express');
var router = express.Router();
module.exports = router;

var Day = require('../db/models/day');
var Attraction = require('../db/models/attraction');


// /api/user/:userId/days/:dayId/ ==> attractions of the 1st day
// /api/user/:userId/days ==> day creation


// /api/days/
//all days and attractions
router.get('/', function(req, res, next){
	var retrievingFromDB = [];
	Day.findAll()
		.then(function(days){
			days.forEach(function(day){
				retrievingFromDB.push(day.getAttractions());
			})
			return Promise.all(retrievingFromDB)
		})
		.then(function(attractions){
			res.status(200).send(attractions);
		})
})


router.post('/', function(req, res, next){
	Day.create(req.body)
		.then(function(){
			return res.status(201).end();
		})
		.catch(next);
})


// /api/days/:dayId/attractions
router.post('/:dayNum/attractions', function(req, res, next){
	Day.findOne({where: {day: +req.params.dayNum}})
		.then(function(day){
			console.log(day)
			day.createAttraction(req.body);
			return res.status(201).end();
		})
		.catch(next);
});




// // Create a new day with no attractions
// // POST /days
// router.post('/', function (req, res, next) {

//     Day.create(req.body)
//         .then(function (createdDay) {
//             res.status(201).send(createdDay);
//         })
//         .catch(next);

// });

// // Delete a day using that day's id
// // DELETE /days/2
// router.delete('/:id', function (req, res, next) {
//     Day.findById(req.params.id)
//         .then(function (dayToDestroy) {
//             return dayToDestroy.destroy();
//         })
//         .then(function () {
//             res.sendStatus(204);
//         })
//         .catch(next);
// });

// // ---

// // -- Attractions on days

// router.param('dayId', function (req, res, next, theDayId) {
//     Day.findById(theDayId)
//         .then(function (foundDay) {
//             req.day = foundDay;
//             next();
//         })
//         .catch(next);
// });

// // Register a hotel to a day
// // /days/2/hotel
// router.put('/:dayId/hotel', function (req, res, next) {
//     req.day.setHotel(req.body.hotelId)
//         .then(function (day) {
//             res.sendStatus(204);
//         })
//         .catch(next);
// });
// // Register a restaurant to a day
// // /days/2/restaurants

// router.put('/:dayId/restaurants', function (req, res, next) {
//     req.day.addRestaurant(req.body.restaurantId)
//         .then(function () {
//             res.sendStatus(204);
//         })
//         .catch(next);
// });

// // Register an activity to a day

// router.put('/:dayId/activities', function (req, res, next) {
//     req.day.addActivity(req.body.activityId)
//         .then(function () {
//             res.sendStatus(204);
//         })
//         .catch(next);
// });

// // Remove a hotel from a day
// // /days/2/hotel

// router.delete('/:dayId/hotel', function (req, res, next) {
//     req.day.setHotel(null)
//         .then(function () {
//             res.sendStatus(204);
//         })
//         .catch(next);
// });

// // Remove a restaurant from a day
// // /days/2/restaurants/16
// router.delete('/:dayId/restaurants/:restaurantId', function (req, res, next) {
//     req.day.removeRestaurant(req.params.restaurantId)
//         .then(function () {
//             res.sendStatus(204);
//         })
//         .catch(next);
// });

// // Remove an activity from a day

// router.delete('/:dayId/activities/:activityId', function (req, res, next) {
//     req.day.removeActivity(req.params.activityId)
//         .then(function () {
//             res.sendStatus(204);
//         })
//         .catch(next);
// });

// // ---