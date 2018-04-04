(function () {
  'use strict';

  angular
    .module('game.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/modules/game/client/views/home.client.view.html',
        controller: 'GameHomeController',
        controllerAs: 'vm'
      })
      .state('game', {
        abstract: true,
        url: '/game',
        template: '<ui-view/>'
      })
      .state('game.local', {
        url: '/local',
        templateUrl: '/modules/game/client/views/game.client.view.html',
        controller: 'LocalGameController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        }
      })
      .state('game.detail', {
        url: '/:gameId',
        templateUrl: '/modules/game/client/views/game.client.view.html',
        controller: 'OnlineGameController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        }
      })
      .state('spectator', {
        url: '/spectator/:gameId',
        templateUrl: '/modules/game/client/views/spectator.client.view.html',
        controller: 'SpectatorController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        }
      })
      .state('leaderboard', {
        url: '/leaderboard',
        templateUrl: '/modules/game/client/views/leaderboard.client.view.html',
        controller: 'LeaderboardController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        }
      });
  }
}());
