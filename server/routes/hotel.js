'use strict';

const express = require('express');
const router = express.Router();
const mime = require('mime');
const models = require('../db/models');
const Hotel = models.Hotel;

module.exports = router;


router.get('/', function(req, res, next){
	res.send('Hello World')
  // Hotel.scope('defaultScope', 'hotelIds').findAll({where: req.query})
  // .then(hotels => res.json(hotels))
  // .catch(next);

})
