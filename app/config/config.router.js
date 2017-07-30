var myApp = angular.module('bonsai', ['ui.router', 'oc.lazyLoad', ]);

myApp.config(function($stateProvider) {

  //$urlRouterProvider.otherwise('/');

  $stateProvider

    .state('home', {
    url: '/',
    template: '<tictac></tictac>',
    resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
          'app/components/tic-tac.model.js',
          'app/components/tic-tac.component.js',
        ]);
      }]
    }

  })

});
