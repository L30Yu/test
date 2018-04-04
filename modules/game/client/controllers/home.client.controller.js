(function () {
  'use strict';

  angular
    .module('game')
    .controller('GameHomeController', GameHomeController);

    GameHomeController.$inject = ['$scope', 'Authentication'];

  function GameHomeController($scope, Authentication) {
    var vm = this;

    vm.authentication = Authentication;

    vm.dummyLeaderboardData = [
        {
            username: 'LOREM',
            picture: '/modules/game/client/img/brand/logo.png',
            gamespl: 10,
            wins: 4,
            losses: 4,
            draws: 2,
        },
        {
            username: 'LOREM',
            picture: '/modules/game/client/img/brand/logo.png',
            gamespl: 10,
            wins: 4,
            losses: 4,
            draws: 2,
        },
        {
            username: 'LOREM',
            picture: '/modules/game/client/img/brand/logo.png',
            gamespl: 10,
            wins: 4,
            losses: 4,
            draws: 2,
        }
    ];

    vm.dummyLobbyData = [
        {
            id: 42,
            Created: '14 mins',
            Name: 'Best Game',
            lobbyId: 0
        },
        {
            id: 42,
            Created: '2 mins',
            Name: 'Betterest Game',
            lobbyId: 0
        },
        {
            id: 42,
            Created: '1 hr',
            Name: 'Not Bad Game',
            lobbyId: 0
        }
    ];

    vm.dummySpectateData = [
        {
            id: 42,
            Created: '14 mins',
            Name: 'Best Game',
            gameId: 0
        },
        {
            id: 42,
            Created: '2 mins',
            Name: 'Betterest Game',
            gameId: 0
        },
        {
            id: 42,
            Created: '1 hr',
            Name: 'Not Bad Game',
            gameId: 0
        }
    ];

  }
}());
