'use strict';

/**
 * @ngdoc overview
 * @name angularnodedockApp
 * @description
 * # angularnodedockApp
 *
 * Main module of the application.
 */
angular
  .module('angularnodedockApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/event', {
        templateUrl: 'views/event.html',
        controller: 'EventCtrl',
        controllerAs: 'event'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
