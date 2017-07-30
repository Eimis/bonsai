var myApp = angular.module('bonsai', ['ui.router']);

myApp.config(function($stateProvider) {
  console.log('ROUTER')
  var homeState = {
    name: 'home',
    url: '/',
    template: '<h3>It works</h3>'
  }

  $stateProvider.state(homeState);
});
