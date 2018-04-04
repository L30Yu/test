(function () {
    'use strict';

    angular
        .module('game')
        .controller('LocalGameController', GameController);

    GameController.$inject = ['$scope', '$state', 'Authentication'];

    function GameController($scope, $state, Authentication) {
        var vm = this;

        vm.gameTitle = 'Local Game';
        vm.isLocalGame = true;
        vm.gameEnded = false;
        vm.winner = 0;
        vm.gameState = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        vm.CURRENT_PLAYER = 1;
        vm.magic = newMagicSquare(3);


        vm.resetBoard = resetBoard;
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

            for (row = 0; row < 3; row++) {
                for (col = 0; col < 3; col++) {

                    cell = svg.getElementById('cell' + row.toString() + col.toString());

                    cell.setAttribute('fill', WHITE_COLOR);
                }
            }
        }

        // click event handler for game board cells
        function cellOnClick(x, y) {

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
            // Magic Square tells me winner has total value 15
            let player1 = 0,
                player2 = 0,
                x,
                y;
            for (x = 0; x < 3; x++) {
                for (y = 0; y < 3; y++) {
                    if (vm.gameState[x][y] === 1) {
                        player1 += vm.magic[x][y];
                    }
                    else if (vm.gameState[x][y] === 2) {
                        player2 += vm.magic[x][y];
                    }
                    if (player1 === 15) {
                        alert('Winner is Player 1');
                        resetBoard();
                        return;
                    }
                    else if (player2 === 15) {
                        alert('Winner is Player 2');
                        resetBoard();
                        return;
                    }
                }
            }

        }

        function newMagicSquare(n) {
            var last = n * n;
            var a = [];
            var m;
            for (m = 0; m < n; m++)
                a[m] = [];


            var i = 0;
            var j = Math.floor(n / 2);;

            for (var c = 1; c <= last; c++) {
                if (i < 0) i = n - (-i);
                if (i >= n) i = i - n;
                if (j < 0) j = n - (-j);
                if (j >= n) j = j - n;

                a[i][j] = c;

                if (c % n == 0) {
                    i++;
                }
                else {
                    i--;
                    j++;
                }

            }
            return a;
        }

        function resetBoard() {
            var row = 3,
                col = 3;

            for (var i = 0; i < row; i++) {
                for (var j = 0; j < col; j++) {

                    vm.gameState[i][j] = 0;

                    var svg = document.getElementById('gameboard'),
                        cell = svg.getElementById('cell' + i + j);

                    if (cell !== null) {
                        cell.setAttribute('fill', WHITE_COLOR);
                    }
                }
            }
            vm.winner = 0;
            vm.gameEnded = false;
        }

    }
}());
