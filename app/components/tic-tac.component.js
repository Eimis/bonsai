'use strict'

var ticTacController = function($rootScope, $scope, ticTacModel, localStorageService) {

  var ctrl = this;
  ctrl.model = ticTacModel;

  ctrl.$onInit = function() {
    loadSavedGame();
  }

  // initialize scope
  var _STARTING_PLAYER = 'X'
  $scope.winner = null
  $scope.logs = []

  //SCOPE FUNCTIONS
  $scope.cellText = function(row, column) {
    var value = cell(row, column)
    return value ? value : '-'
  }

  $scope.cellClick = function(row, column) {

    if ($scope.loading) {
      return
    }

    if ($scope.winner) {
      alert('Game is already over')
      return
    }

    if ($scope.player != $scope.currentPlayer) {
      alert('Not your turn')
      return
    }

    ctrl.model.logGame($scope, row, column).then(function(resp){
      console.log('done logging')

      $scope.error = null;
      if (resp.log.error) {
        $scope.error = resp.log.error
      } else {
        //TODO: array:
        $scope.logs.push(resp.log);
        console.log('logs: ', $scope.logs)
      }
    })

    localStorageService.set('currentPlayer', $scope.currentPlayer)
    localStorageService.set('player', $scope.player)

    setCell(row, column, $scope.player);
    checkBoard();
    $scope.currentPlayer = nextPlayer($scope.currentPlayer)
  }

  $scope.newGame = function() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        setCell(i, j, null)
      }
    }

    resetGameVariables();
    saveGameVariables();
  }


  // UTILITY FUNCTIONS
  function resetGameVariables() {
    $scope.loading = true;

    $scope.error = null
    $scope.logs = []

    ctrl.model.initializeGame().then(function(response){
      console.log('new game: ', response.game)

      $scope.game = response.game.pk;
      $scope.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]
      $scope.winner = null;
      $scope.currentPlayer = _STARTING_PLAYER
      $scope.player = _STARTING_PLAYER

      $scope.loading = false;
    });
  }

  //a function to check and load previous game from local storage if needed:
  function loadSavedGame() {
    var game = localStorageService.get('game')
    var board = localStorageService.get('board')
    var currentPlayer = localStorageService.get('currentPlayer')
    var player = localStorageService.get('player')
    var logs = localStorageService.get('logs')

    //if saved game exists in local storage, load it. Otherwise use API to
    //create a new one:
    if (game) {
      $scope.game = game
      $scope.board = board
      $scope.currentPlayer = currentPlayer
      $scope.player = player
      $scope.logs = logs
    } else {
      resetGameVariables();
      saveGameVariables();
    }

  }

  //saves game variables to local storage
  function saveGameVariables() {
      localStorageService.set('game', $scope.game);
      localStorageService.set('board', $scope.board);
      localStorageService.set('currentPlayer', $scope.currentPlayer)
      localStorageService.set('player', $scope.player)
      localStorageService.set('logs', $scope.logs)
  }

  //removes local game variables from local storage:
  function destroyGameVariables() {
      localStorageService.set('game', null)
      localStorageService.set('board', null)
      localStorageService.set('currentPlayer', null)
      localStorageService.set('player', null)
      localStorageService.set('logs', [])
  }

  // returns the value of cell
  function cell(row, column) {
    return $scope.board[row][column]
  }

  // sets the value of cell
  function setCell(row, column, value) {
    $scope.board[row][column] = value
  }

  // returns the next player
  function nextPlayer(player) {
    return {
      O: 'X',
      X: 'O'
    }[player]
  }

  // checks the board and declare winner
  function checkBoard() {
    var winner, empty = false

    // check for any empty cell
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (!cell(i, j)) empty = true
      }
    }

    // no more empty cell - no winner
    if (!empty) {
      $scope.winner = 'NONE'
      destroyGameVariables();

      //user gas to click 'new game' at this point

      return
    }

    // check board vertically and horizontally
    for (var i = 0; i < 3; i++) {
      if (cell(i, 0) && cell(i, 0) == cell(i, 1) && cell(i, 1) == cell(i, 2)) {
        winner = cell(i, 0)
      }
      if (cell(0, i) && cell(0, i) == cell(1, i) && cell(1, i) == cell(2, i)) {
        winner = cell(0, i)
      }
    }

    // check board diagonally
    if (cell(0, 0) && cell(0, 0) == cell(1, 1) && cell(1, 1) == cell(2, 2)) {
      winner = cell(0, 0)
    }
    if (cell(0, 2) && cell(0, 2) == cell(1, 1) && cell(1, 1) == cell(2, 0)) {
      winner = cell(0, 2)
    }

    // winner? declare!
    if (winner) {
      $scope.winner = winner
      destroyGameVariables();
    }

  }  // end of checkBoard() function

  //this would only be needed if we'd have different routes:
  $scope.$on('$destroy', function() {
    if (!$scope.winner) {
      saveGameVariables()
    }
  });

  //refreshing the page:
  window.onbeforeunload = function () {
    if (!$scope.winner) {
      saveGameVariables()
    }
  };

}

angular
  .module('bonsai')
  .component('tictac', {
    templateUrl: '/app/components/tic-tac.html',
    controller: ticTacController,
  });
