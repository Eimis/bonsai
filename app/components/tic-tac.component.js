'use strict'

var ticTacController = function ($rootScope, $scope, ticTacModel) {

  var ctrl = this;
  ctrl.model = ticTacModel;

  ctrl.$onInit = function() {
    ctrl.model.updateData();
  }

}

angular
  .module('bonsai')
  .component('tictac', {
  templateUrl: '/app/components/tic-tac.html',
  controller: ticTacController,
});
