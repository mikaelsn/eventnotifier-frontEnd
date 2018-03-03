'use strict';

(function () {
    
    angular
        .module('angularnodedockApp')
        .controller('LoginCtrl', LoginController);
 
    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    
    function LoginController($location, AuthenticationService, FlashService) {

        var vm = this;
        vm.login = login;
 
        (function initController() {
            AuthenticationService.ClearCredentials();
        })();
 
        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response) {
                    FlashService.Success("Logged in!");
                    AuthenticationService.SetCredentials(vm.username, response.accessToken);
                    $location.path('/');
                    
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }
 
})();