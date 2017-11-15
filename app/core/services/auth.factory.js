(function () {

    'use strict';

    angular.module('app').factory('AuthFactory', function ($http, AppConstant, $location) {
        var attemptedUrl = '';
        return {
            login: function() {
                
            },

            logout: function() {

            },

            saveAttemptedUrl: function(url) {
                attemptedUrl = url;
            },

            redirectToAttemptedUrl: function() {
                if (attemptedUrl == '') {
                    return;
                }
                var url = attemptedUrl;
                attemptedUrl = '';
                
                $location.path = url;
            }
        };
    });

})();
