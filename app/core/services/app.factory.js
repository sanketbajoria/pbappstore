(function () {

  'use strict';

  angular.module('app').factory('AppFactory', function ($http, AppConstant) {

    return {
      categories: $http.get(AppConstant.baseUrl + '/categories', {
        params: {
          'api_key': AppConstant.api_key
        }
      }).then(function (r) {
        return r.data.categories.filter(function (c) {
          if (c.id === 167) {
            c.label = 'All Apps';
          }
          return !c.is_stock;
        });
      }),
      getApps: function () {
        return $http.get(AppConstant.baseUrl + '/mobile_application_updates', {
          params: {
            'api_key': AppConstant.api_key
          }
        }).then(function (res) {
          return res.data.mobile_application_updates;
        });
      },

      getApp: function (appId) {
        return $http.get(AppConstant.baseUrl + '/mobile_application_updates/' + appId, {
          params: {
            'api_key': AppConstant.api_key
          }
        }).then(function (res) {
          return res.data.mobile_application_update;
        });
      }

    };
  });

})();
