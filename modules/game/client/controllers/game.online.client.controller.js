(function () {
  'use strict';

  angular
    .module('game')
    .controller('OnlineGameController', GameController);

  GameController.$inject = ['$scope', '$state', 'Authentication', 'Socket'];

  function GameController($scope, $state, Authentication, Socket) {
    var vm = this;

    vm.gameTitle = 'Online Game';
    vm.winner = 0;
    vm.gameState = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    vm.CURRENT_PLAYER = 1;

    vm.cellOnClick = cellOnClick;

    var BLUE_COLOR = '#0000FF',
        RED_COLOR = '#FF0000',
        WHITE_COLOR = '#FFFFFF';

    init();

    function init() {
      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
      }

      var svg = document.getElementById('gameboard'),
            row,
            col,
            cell;


        // attach a click event callback to every clickable game board cell. Cells are named
        // 'cellXY' where X and Y are the row and column respectively from the top corner.
        //
        //  00 | 01 | 02
        // ----+----+----
        //  10 | 11 | 12
        // ----+----+----
        //  20 | 21 | 22

        for (row = 0; row < 3; row++){
            for (col = 0; col < 3; col++){

                cell = svg.getElementById('cell' + row.toString() + col.toString());

                cell.setAttribute('fill', WHITE_COLOR);
            }
        }
    }

    // click event handler for game board cells
    function cellOnClick(x, y)
    {

        if (isValidClick(x, y) === false) {
            return;
        }

        var svg = document.getElementById('gameboard'),
            cell = svg.getElementById('cell' + x + y);

        if (cell !== null) {
            switch (vm.CURRENT_PLAYER) {
                case 1:
                    cell.setAttribute('fill', BLUE_COLOR);
                    vm.gameState[x][y] = vm.CURRENT_PLAYER;
                    vm.CURRENT_PLAYER = 2;
                    break;

                case 2:
                    cell.setAttribute('fill', RED_COLOR);
                    vm.gameState[x][y] = vm.CURRENT_PLAYER;
                    vm.CURRENT_PLAYER = 1;
                    break;

                default:
                    break;
            }
        }

        checkForWinner();
    }


    // Perhaps not necessary, but it doesn't seem right to be able to change the cell.
    function isValidClick(row, col) {
        return vm.gameState[row][col] == 0 && !vm.gameEnded;
    }

    function checkForWinner() {
        // Task 3
    }

  }

}());
