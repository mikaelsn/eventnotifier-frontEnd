(function () {
    'use strict';
 
    angular
        .module('angularnodedockApp')
        .factory('AuthenticationService', AuthenticationService);
 
    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService) {
        var service = {};
 
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
 
        return service;
 
        function Login(username, password, callback) {
            $http.post('http://localhost:8083/sessions', { username: username, password: password, deviceId: "deviceId" })
               .success(function (response) {
                   callback(response);
               });
        }
 
        function SetCredentials(username, jwt) {
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: jwt
                }
            };
 
            // $http.defaults.headers.common['Authorization'] = 'Bearer ' + jwt; // jshint ignore:line
            $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
            $cookieStore.put('globals', $rootScope.globals);
        }
 
        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Bearer';
        }
    }
})();