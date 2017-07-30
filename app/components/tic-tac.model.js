angular.module('bonsai')
  .factory('ticTacModel', function() {

    function updateData(scope) {
      console.log('updating data . . .')
    }

    return {
      updateData: updateData,
    }
  })
