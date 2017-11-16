(function () {

  'use strict';

  angular.module('pb.ds.home').config(function ($stateProvider) {
    $stateProvider.state('signin', {
      url: '/signin?refapp&req',
      data: {
        pageTitle: 'Signin | PB App Store',
        bodyClass: 'signin'
      },
      views: {
        // 'header': {
        //   controller: 'HeaderController as header',
        //   templateUrl: 'modules/main/templates/header.html'
        // },
        'content': {
          controller: 'SigninController as signin',
          templateUrl: 'modules/auth/templates/signin.html'
        },
        // 'footer': {
        //   controller: 'FooterController as footer',
        //   templateUrl: 'modules/main/templates/footer.html'
        // }
      }
    });

    $stateProvider.state('signup', {
      url: '/signup?refapp&req',
      data: {
        pageTitle: 'Signup | PB App Store',
        bodyClass: 'signin'
      },
      views: {
        // 'header': {
        //   controller: 'HeaderController as header',
        //   templateUrl: 'modules/main/templates/header.html'
        // },
        'content': {
          controller: 'SignupController as signup',
          templateUrl: 'modules/auth/templates/signup.html'
        },
        // 'footer': {
        //   controller: 'FooterController as footer',
        //   templateUrl: 'modules/main/templates/footer.html'
        // }
      }
    });
  });

})();
