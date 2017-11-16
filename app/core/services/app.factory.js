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
            c.selected = true;
          }
          if (c.id === 168) {
            c.description = 'Send, Receive, Track, Sort, Go Global';
          }
          if (c.id === 169) {
            c.description = 'International expansion and global retail made easy';
          }
          if (c.id === 170) {
            c.description = 'Reach out to new customers, analyse competition, build digital presence';
          }
          if (c.id === 171) {
            c.description = 'Listen to your customers, manage tickets, resolve quickly';
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
      },
      getComments: function (appId) {
        return $http.get(AppConstant.baseUrl + '/mobile_application_updates/' + appId + '/comments', {
          params: {
            'api_key': AppConstant.api_key
          }
        }).then(function (res) {
          return res.data.comments;
        });
      },

    };
  });

})();
