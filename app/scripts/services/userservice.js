(function () {
    'use strict';
 
    angular
        .module('angularnodedockApp')
        .factory('UserService', UserService);
 
    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.Create = Create;
        service.Delete = Delete;
 
        return service;
 
        function Create(user) {
            return $http.post('http://localhost:8083/sessions', user).then(handleSuccess, handleError('Error creating user'));
        }
 
        function Delete(id) {
            return $http.delete('http://localhost:8083/sessions/' + id).then(handleSuccess, handleError('Error deleting user'));
        }
 
        // private functions
 
        function handleSuccess(res) {
            return res.data;
        }
 
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
 
})();