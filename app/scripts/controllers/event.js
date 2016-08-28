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

    $scope.change = function(){
      if($scope.search !== undefined) {
        $scope.fetch();
      }
    };

    $scope.fetch = function(){
      var deferred = $q.defer();
      $http.get('http://localhost:8080/items')
      .then(function successCallback(response) {
        console.log(response);
        deferred.resolve($scope.events = angular.fromJson(response.data.items));
      }, function errorCallback(error) {
        deferred.resolve($scope.events = angular.fromJson({}));
      });
      return deferred.promise;
    };
  }]);