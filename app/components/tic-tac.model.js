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

    function logGame(scope, row, column) {

      var config = {
        headers: {'Accept': 'application/json'},
      };

      data = {
        row: row,
        column: column,
        player: scope.currentPlayer,
        game: scope.game,
      }

      return $http.post('http://localhost:8000/game/log', data, config)
        .then(function (response) {
          var resultObj = angular.fromJson(response.data);
          return {
            log: response.data,
          }
        })
        .catch(function (response) {
          return {
            log: null
          }
        });
    }

    return {
      initializeGame: initializeGame,
      logGame: logGame,
    }
  })
