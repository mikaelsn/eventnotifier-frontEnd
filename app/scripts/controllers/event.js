'use strict';

/**
 * @ngdoc function
 * @name angularnodedockApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the angularnodedockApp
 */
angular.module('angularnodedockApp')
  .controller('EventCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

    var deferred = $q.defer();
    $http.get('http://localhost:8080/items', { timeout: 90000 })
      .then(function successCallback(response) {
        deferred.resolve($scope.events = angular.fromJson(response.data));
      }, function errorCallback(error) {
        console.log(error);
        deferred.reject($scope.events = false);
      });
    return deferred.promise;

  }]);