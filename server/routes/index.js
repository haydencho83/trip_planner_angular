'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();
module.exports = router;

router.use('/days', require('./days'));
router.use('/attractions', require('./attractions'));
router.use('/users', require('./users'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
  res.status(404).end();
});
