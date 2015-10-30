var session = require('./session');
var board = require('./board');
var chat = require('./chat');
var heroes = require('./heroes');

var app = {
  controller: function () {
    
  },
  view: function (ctrl) {
    return [
      m.component(board.Component),
      m.component(chat.Component),
      m.component(heroes.Component)
      //m.component(session.Component, new session.ViewModel())
    ];
  }
};

m.mount(document.body, app);