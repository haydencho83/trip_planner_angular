'use strict';

const express = require('express');
const mime = require('mime');
const router = express.Router();
const Restaurant = require('../db/models/restaurant.js');


module.exports = router;


router.get('/', function(req, res, next){

	Restaurant.findAll({})
		.then(function(restaurants){
			res.status(200).json(restaurants);
		})
		
		.catch(next);

  // Hotel.scope('defaultScope', 'hotelIds').findAll({where: req.query})
  // .then(res => res.data)
  // .catch(next);

})
