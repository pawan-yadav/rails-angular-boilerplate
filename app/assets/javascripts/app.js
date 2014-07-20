angular.module('App.services', []);
angular.module('App.controllers', []);
angular.module('App.filters', []);
angular.module('App', [
    'ngRoute',
    'App.controllers',
    'App.services',
    'App.filters'
  ])
  .config(function ($routeProvider){
    $routeProvider
      .when('/', {
      })
      .otherwise({
        redirectTo: '/'
      });
  });