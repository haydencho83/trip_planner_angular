var express = require('express');
var router = express.Router();
module.exports = router;

var User = require('../db/models/user');
var Day = require('../db/models/day');


//user create, user delete, user edit






// /api/user
router.get('/', function(req, res, next){
	User.findAll()
		.then(function(users){
			res.status(200).send(users);
		})
});

// create user account
router.post('/', function(req, res, next){
	User.create(req.body)
		.then(function(createdUser){
			res.status(201).send(createdUser)
		})
});


// can retrieve all attractions data for each user
// /api/user/134/attractions
router.get('/user/:userId/attractions/', function(req, res, next){
	User.findById(req.params.userId)
		.then(function(user){
			return user.getAttractions({})
		})
})


