var express = require('express');
var router = express.Router();
var Attraction = require('../db/models/attraction');
var User = require('../db/models/user');
var Day = require('../db/models/day');

module.exports = router;

router.param('attractionId', function(req, res, next, id){
	Attraction.findById(id)
		.then(attraction => {
			if (!attraction) {const err = Error('Attraction not found');
			err.status(404);
			throw err;
		}
		req.attraction = attraction;
		next();
		return null;
		})
		.catch(next);
});


// /api/user/:userId/
router.delete('/:attractionId', function(req, res, next){
	req.attraction.destroy()
		.then((deleted) => res.status(204).send(deleted))
		.catch(next);
});

