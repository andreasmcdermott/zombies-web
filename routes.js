var mongo = require('mongojs');

var setupRoutes = function (app, auth) {
  var db = mongo.connect('zombies', ['users']);
  
  app.get('/', auth, function (req, res) {
    res.sendfile('./client/index.html');
  });
  
  app.get('/signin', function (req, res) {
    res.sendfile('./client/signin.html');
  });
  
  app.post('/signin', function (req, res) {
    db.users.findOne({ username: req.body.username }, function (err, user) {
      if(user) {
        req.session.username = user.username;
        res.redirect('/');
      } 
      else {
        res.sendfile('./client/signin.html');
      }
    });
  });
  
  app.get('/signout', function (req, res) {
    req.session.reset();
    res.redirect('/');
  });
};

module.exports = setupRoutes;