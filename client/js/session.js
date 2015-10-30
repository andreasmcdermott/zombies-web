var ViewModel = function (username, password) {
  this.username = m.prop(username || '');
  this.password = m.prop(password || '');
};

var Component = {
  controller: function (args) {
    this.viewModel = args || new ViewModel();
    
    this.currentUser = function () {
      return null;
    };
    
    this.signIn = function (viewModel) {
      console.log('signing in', viewModel.username(), viewModel.password());
      return false;
    };
  },
  view: function (ctrl, args) {    
    var vm = ctrl.viewModel;
    
    if(ctrl.currentUser() !== null) {
      return m('div', ctrl.currentUser());
    }
    
    return m('div', [
      m('div', [
        m('label', 'Username'),
        m('input', { oninput: m.withAttr('value', vm.username), value: vm.username() })
      ]),
      m('div', [
        m('label', 'Password'),
        m('input[type="password"]', { oninput: m.withAttr('value', vm.password), value: vm.password() })
      ]),
      m('div', [
        m('button', { onclick: ctrl.signIn.bind(this, vm) }, 'Sign in')
      ])
    ]);
  }
}

module.exports.Component = Component;
module.exports.ViewModel = ViewModel;