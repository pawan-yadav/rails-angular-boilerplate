angular.module('App.services', []);
angular.module('App.controllers', []);
angular.module('App.filters', []);
angular.module('App.directives', []);
angular.module('App', [
    'ngRoute',
    'firebase',
    'App.controllers',
    'App.services',
    'App.directives',
    'App.filters'
  ])
  .config(function ($routeProvider){
    $routeProvider
      .when('/', {
      })
      .when('/games/:gameId', {
        controller: 'GamesShowController',
        templateUrl: 'games/show.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });