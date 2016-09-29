var express = require('express');
var router = express.Router();
module.exports = router;

var Day = require('../db/models/day');
var Attraction = require('../db/models/attraction');
var User = require('../db/models/user');


// create a new day
router.post('/', function(req, res, next){
	Day.create(req.body)
		.then(function(createdDay){
			createdDay.setUser(req.session.userId);
			return res.status(201).end();
		})
		.catch(next);
})


// /api/days/
// all days and attractions
router.get('/', function(req, res, next){
	var retrievingFromDB = [];

	User.findById(req.session.userId)
	.then(function(user){
		return user.getDays()
	})
	.then(function(days){
		days.forEach(function(day){
			retrievingFromDB.push(day.getAttractions());
		})
		return Promise.all(retrievingFromDB)
	})
	.then(function(attractions){
		res.status(200).send(attractions);
	})
});


router.delete('/:dayNum', function(req, res, next){
	Day.findOne({
		where: {day: +req.params.dayNum}, 
		include: [{model: User, where: {id: req.session.userId}}]
	})
		.then(function(day){
			Attraction.destroy({where: {dayId: day.id}});
			return day.destroy();
		})
		.then(function(){
			return res.status(204).end();
		})
		.catch(next);
});


router.put('/:dayNum', function(req, res, next){
	console.log(req.params.dayNum);//3
	Day.findOne({
		where: {day: +req.params.dayNum},
		include: [{model: User, where: {id: req.session.userId}}]
	})
		.then(function(day){
			return day.update({day: req.params.dayNum}, {where: {day: req.params.dayNum + 1}});
			//4->3
		})
		.then(function(updatedDay){
			console.log(updatedDay);
			return res.status(204).end();
		})
		.catch(next);
});


// /api/days/:dayId/attractions
router.post('/:dayNum/attractions', function(req, res, next){
	Day.findOne({where: {day: +req.params.dayNum}, 
		include: [{model: User, where: {id: req.session.userId}}]
	})
		.then(function(day){
			console.log(day)
			day.createAttraction(req.body);
			return res.status(201).end();
		})
		.catch(next);
});