var express = require('express');
var router = express.Router();
module.exports = router;

var User = require('../db/models/user');
var Day = require('../db/models/day');


//user create, user delete, user edit
router.param('id', function (req, res, next, id) {
	console.log(id)
  User.findById(id)
  .then(function (user) {
    if (!user) throw HttpError(404);
    req.requestedUser = user;
    next();
  })
  .catch(next);
});



// create user account
router.post('/', function(req, res, next){
	console.log(req.body)
	User.create(req.body)
		.then(function(createdUser){
			res.status(201).send(createdUser)
		})
});


// // can retrieve all attractions data for each user
// // /api/user/134/attractions
// router.get('/user/:userId/attractions/', function(req, res, next){
// 	// User.findById(req.params.userId)
// 		// .then(function(user){
// 		// 	return user.getAttractions({})
// 		// })
// 	req.requestedUser.getAttractions({})
// 		.then(function(attractions){
// 			res.status(200).send(attractions);
// 		})

// })



// router.delete('/:id', function (req, res, next) {
//   req.requestedUser.destroy()
//   .then(function () {
//     res.status(204).end();
//   })
//   .catch(next);
// });