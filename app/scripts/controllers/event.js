'use strict';

(function () {

  angular
    .module('angularnodedockApp')
    .controller('EventCtrl', EventCtrl);

  EventCtrl.$inject = ['$scope', '$http', '$q', 'FlashService'];

  function EventCtrl($scope, $http, $q, FlashService) {

    (function initController() {
      var deferred = $q.defer();
      $http.get('http://localhost:8080/items', {
        timeout: 90000
      })
        .then(function successCallback(response) {
          deferred.resolve($scope.events = angular.fromJson(response.data));
        }, function errorCallback(error) {
          console.log(error);
          deferred.reject($scope.events = false);
        });
      return deferred.promise;
    })();

    $scope.email = function() {
      $scope.dataLoading = true;
      $http.get('http://localhost:8080/email'
      //, {timeout: 90000}
      )
        .then(function successCallback(response) {
          $scope.dataLoading = false;
          FlashService.Success("Emails sent!");
          console.log("sent");
        }, function errorCallback(error) {
          console.log(error);
          $scope.dataLoading = false;
          FlashService.Success("Something went wrong sending!");
        });
    }
  }
})();
