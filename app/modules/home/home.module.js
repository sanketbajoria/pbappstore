(function () {

  'use strict';

  angular.module('pb.ds.home', ['ui.router', 'bootstrapLightbox']).config(function(LightboxProvider) {
    LightboxProvider.fullScreenMode = true;
  });

})();
