'use strict';

const express = require('express');
const mime = require('mime');
const router = express.Router();
const Activity = require('../db/models/activity.js');


module.exports = router;


router.get('/', function(req, res, next){

	Activity.findAll({})
		.then(function(activities){
			res.status(200).json(activities);
		})
		
		.catch(next);

  // Hotel.scope('defaultScope', 'hotelIds').findAll({where: req.query})
  // .then(res => res.data)
  // .catch(next);

})
