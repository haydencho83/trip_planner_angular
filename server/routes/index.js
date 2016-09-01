'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();
module.exports = router;


//NEED TO CHANGE//

// router.use('/artists', require('./artists'));
// router.use('/albums', require('./albums'));
// router.use('/playlists', require('./playlists'));
// router.use('/songs', require('./songs'));



// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
  res.status(404).end();
});
