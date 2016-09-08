'use strict';
var path = require('path');
var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./db/models/user');

require('./config')(app);

app.use(cookieParser());
app.use(session({
	secret: 'Hans application secret'
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(function (user) {
    done(null, user);
  })
  .catch(done);
});


passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done){
    User.findOne({
      where: {
        email: email,
        password: password
      }
    })
      .then(function(user){
        if(user === null){ done(null, false) }
        else {
          done(null, user);
        }
      })
      .catch(done); 
}))

app.get('/', function(req, res, next){
	if (!req.session.visitCount){ req.session.visitCount = 1}
	else { req.session.visitCount += 1}
	next();
	// res.send({visit_count: req.session.visitCount});
});


app.post('/login', passport.authenticate('local'), function(req, res){
	res.redirect('/');
})


module.exports = app;


// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));





/*
 This middleware will catch any URLs resembling a file extension
 for example: .js, .html, .css
 This allows for proper 404s instead of the wildcard '/*' catching
 URLs that bypass express.static because the given file does not exist.
 */
app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.get('/*', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
