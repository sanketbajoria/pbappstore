(function () {

  'use strict';

  angular.module('app').controller('HeaderController', function ($log) {
    var _this = this;

    function init() {
      _this.name = localStorage.getItem("name");
      _this.session = (localStorage.getItem("session") === 'true');
      if (_this.session) {
        if (!_this.name) {
          _this.name = "Sign in"; 
        }
      } else {
        _this.name = "Sign in";
      }
    }

    init();
    
    _this.logout = function() {
      localStorage.clear();
      init();
    }

  });

})();
