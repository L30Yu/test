(function () {
  'use strict';

  angular
    .module('game')
    .controller('SpectatorController', SpectatorController);

  SpectatorController.$inject = ['$scope', '$state', 'Authentication', 'Socket'];

  function SpectatorController($scope, $state, Authentication, Socket) {
    var vm = this;
    vm.gameState = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    var GAME_PATH = 'game/',
        BLUE_COLOR = '#0000FF',
        RED_COLOR = '#FF0000',
        WHITE_COLOR = '#FFFFFF',
        CURRENT_PLAYER = 1;

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

                if (cell !== null) {
                    cell.addEventListener('click', cellOnClick);
                }

                cell.setAttribute('fill', WHITE_COLOR);
            }
        }
    }

    // click event handler for game board cells
    function cellOnClick()
    {

        var x = parseInt(this.id[4]),
            y = parseInt(this.id[5]);

        if (isValidClick(x, y) === false) {
            return;
        }


        var svg = document.getElementById('gameboard'),
            cell = svg.getElementById('cell' + x + y);


        if (cell !== null) {
            switch (CURRENT_PLAYER) {
                case 1:
                    cell.setAttribute('fill', BLUE_COLOR);
                    vm.gameState[x][y] = 'B';
                    CURRENT_PLAYER = 2;
                    break;

                case 2:
                    cell.setAttribute('fill', RED_COLOR);
                    vm.gameState[x][y] = 'R';
                    CURRENT_PLAYER = 1;
                    break;

                default:
                    cell.setAttribute('fill', WHITE_COLOR);
                    break;
            }
            console.log('vm.gameState: ');
            console.log(vm.gameState);
        }

        // checkForWinner(response.winner);
    }


    // Perhaps not necessary, but it doesn't seem right to be able to change the cell.
    function isValidClick(row, col) {
        var svg = document.getElementById('gameboard'),
            cell = svg.getElementById('cell' + row + col);

        return cell.getAttribute('fill') === WHITE_COLOR ? true : false
    }

  }
}());
