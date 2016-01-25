App = Ember.Application.create();

App.Router.map(function() {
  this.route('setSelfBtcAddress', { path: '/' });
  this.route('setTargetBtcAddress');
  this.route('chat');
});