angular.module('bonsai')
  .factory('ticTacModel', function($http) {

    function initializeGame(scope) {


      var config = {
        headers: { 'Accept': 'application/json' },
      };

      return $http.get('http://localhost:8000/game/init', config)
        .then(function (response) {
          var resultObj = angular.fromJson(response.data);
          return {
            game: resultObj,
          }
        })
        .catch(function (err) {
          console.log(err)
          return {
            result: null
          }
        });




    }

    return {
      initializeGame: initializeGame,
    }
  })
