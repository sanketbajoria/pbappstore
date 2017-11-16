(function () {

  'use strict';

  var app = angular.module('app', [
    'pb.core',
    'pb.ds.home',
    'pb.ds.tables',
    'slickCarousel'
  ]);

  app.constant('AppConstant', {'api_key': 'btfutlpsfbd13gxo9pnh5mm1lnap66', 'store_id': '8940', baseUrl: '/api/v2/8940', baseApi: '/api/v1'});
  
  app.directive('onEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
  });
  // configure debugging
  angular.module('app').config(function ($logProvider, config) {
    $logProvider.debugEnabled(config.debug);
  });

  // configure production mode
  angular.module('app').config(function ($compileProvider, config) {
    $compileProvider.debugInfoEnabled(config.debug);
  });

  // ui-bootstrap tooltip
  angular.module('app').config(function ($uibTooltipProvider) {
    $uibTooltipProvider.options({
      appendToBody: true
    });
  });

  // UI ROUTER CONFIG
  angular.module('app').config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/apps');
  });

  angular.module('app').run(
    function ($log, $rootScope, $document, $timeout, $location, $state) {

      $rootScope.$on('$stateChangeStart', function (event, toState,
        toParams, fromState, fromParams) {
        $log.debug('To State:', toState, 'From state:', fromState);

        if (!toState || !toState.data) {
          return;
        }

      });

      // STATE CHANGE ERROR
      $rootScope.$on('$stateChangeError', function (event, toState,
        toParams, fromState, fromParams, error) {
        $log.debug('$stateChangeError: ', error);
      });

      // STATE NOT FOUND
      $rootScope.$on('$stateNotFound', function (unfoundState) {
        $log.debug('$stateNotFound: ', unfoundState);
      });

      // ROUTE CHANGE SUCCESS
      $rootScope.$on('$routeChangeSuccess', function (newRoute,
        oldRoute) {

      });

      // ROUTE CHANGE START
      $rootScope.$on('$routeChangeStart',
        function (newRoute, oldRoute) {

        });

      // STATE CHANGE SUCCESS
      $rootScope.$on('$stateChangeSuccess', function (event, toState,
        toParams, fromState, fromParams) {

      });

      // VIEW CONTENT LOADING
      $rootScope.$on('$viewContentLoading', function (event) {

      });

      // VIEW CONTENT LOADED
      $rootScope.$on('$viewContentLoaded', function (event) {

      });

    });

})();
