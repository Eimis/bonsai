var myApp = angular.module('bonsai', ['ui.router', 'oc.lazyLoad', 'LocalStorageModule', ]);

myApp.config(function($stateProvider) {

  //$urlRouterProvider.otherwise('/');

  $stateProvider

  .state('home', {
    url: '/',
    template: '<tictac></tictac>',
    resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {

        //extra css:
        return $ocLazyLoad.load([
          'app/components/tic-tac.css',
        ])
        .then(function(){
          return $ocLazyLoad.load([
            'app/components/tic-tac.model.js',
            'app/components/tic-tac.component.js',
          ])
        });

      }]
    }

  })

});
