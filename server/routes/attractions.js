var express = require('express');
var router = express.Router();
var Attraction = require('../db/models/attraction');
var User = require('../db/models/user');
var Day = require('../db/models/day');

module.exports = router;

// /api/user/:userId/
router.delete('/', function(req, res, next){
	console.log(req.body);
	
	Attraction.destroy({id: req.body.id})
		.then(function(attraction){
			res.status(204).send(attraction)
		})
});

