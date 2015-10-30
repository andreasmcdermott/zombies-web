var session = require('client-sessions');
var mongo = require('mongojs');

var secure = function (app) {
  var db = mongo.connect('zombies', ['users']);
  
  app.use(session({
    cookieName: 'session',
    secret: 'abc',
    duration: 30 * 60 * 1000,
    activeDuration: 10 * 60 * 1000
  }));
  
  app.use(function (req, res, next) {
    if(req.session && req.session.username) {
      db.users.findOne({ username: req.session.username }, function (err, user) {
        if(user) {
          delete user.password;
          req.user = user;
          req.session.username = user.username;
        }
        next();
      });
    } else {
      next();
    }
  });
  
  return function (req, res, next) {
    if(!req.user) {
      res.redirect('/signin');
    } else {
      next();
    }
  }
};

module.exports = secure;