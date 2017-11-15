(function () {

  'use strict';

  angular.module('pb.ds.home').controller('SigninController',
    function ($log, $uibModal, AppFactory, $state, $stateParams) {

      var _this = this;
      _this.data = {};

      _this.login = function() {
        console.log(_this.data);
        localStorage.setItem('session', true);
        $state.go('appDetail', {appId: $stateParams.refapp, req: $stateParams.req});
      }

      _this.gotoSignup = function() {
        $state.go('signup', $stateParams);
      }

    });

  angular.module('pb.ds.home').controller('SignupController',
    function ($log, $uibModal, AppFactory, $state) {

      var _this = this;


    });

})();
