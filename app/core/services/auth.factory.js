(function () {

    'use strict';

    angular.module('app').factory('AuthFactory', function ($http, AppConstant, $location) {
        var attemptedUrl = '';
        return {
            login: function (data) {
                return $http.post(AppConstant.baseApi + '/login', data).then(function(res) {
                    localStorage.setItem('session', true);
                    localStorage.setItem('name', res.data.name);
                    return res.data;
                });
            },

            createUser: function(data) {
                return $http.post(AppConstant.baseApi + '/users', data);
            },

            logout: function () {
                localStorage.clear();
            },

            saveAttemptedUrl: function (url) {
                attemptedUrl = url;
            },

            redirectToAttemptedUrl: function () {
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
