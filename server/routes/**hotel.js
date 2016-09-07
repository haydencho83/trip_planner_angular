'use strict';

const express = require('express');
const mime = require('mime');
const router = express.Router();
const Hotel = require('../db/models/hotel.js');


module.exports = router;


router.get('/', function(req, res, next){

	Hotel.findAll({})
		.then(function(hotels){
			res.status(200).json(hotels);
		})
		.catch(next);

  // Hotel.scope('defaultScope', 'hotelIds').findAll({where: req.query})
  // .then(res => res.data)
  // .catch(next);

})
