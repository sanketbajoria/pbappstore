(function () {

  'use strict';

  angular.module('pb.ds.home').config(function ($stateProvider) {
    $stateProvider.state('apps.detail', {
      url: '/apps/:appId',
      resolve: {
        app: function (AppFactory, $stateParams) {
          return AppFactory.getApp($stateParams.appId);
        }
      },
      data: {
        pageTitle: 'Application Detail',
        access: 'private',
        bodyClass: 'home'
      },
      views: {
        'header': {
          controller: 'HeaderController as header',
          templateUrl: 'modules/main/templates/header.html'
        },
        'content': {
          controller: 'AppDetailController as app',
          templateUrl: 'modules/app/templates/app.html'
        }
      }
    });
  });

})();
