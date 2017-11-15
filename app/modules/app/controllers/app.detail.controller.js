(function () {

  'use strict';

  angular.module('pb.ds.home').controller('AppDetailController',
    function ($log, $uibModal, $state, $stateParams, app, AppFactory, fancyboxService,AuthFactory) {

      var _this = this;

      _this.data = app;
      _this.ratingValue = 4.2;
      _this.filter = {
        OS: [
          { label: 'Android', searchValue: ['Android'] },
          { label: 'iOS', searchValue: ['iPhone', 'iPad'] },
          { label: 'Windows Phone', searchValue: ['WindowsPhone'] }]
      };

      _this.categories = [];
      AppFactory.categories.then(function (categories) {
        _this.categories = categories;
      });


      _this.screenShots = [];



      _this.screenShots = app.screenshots_urls.map(function (s) {
        return s;
      });


      _this.imageGallery = {
        items: app.screenshots_urls.map(function (s) {
          return {
            imageName: s
          };
        }),
        selected: 0,
        selectedImage: app.screenshots_urls[0],
        click: function (item, index) {
          _this.imageGallery.selectedImage = item.imageName;
          _this.imageGallery.selected = index;
        },
        settings: {
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
          responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: app.screenshots_urls.length,
                slidesToScroll: app.screenshots_urls.length
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: app.screenshots_urls.length,
                slidesToScroll: app.screenshots_urls.length
              }
            }
          ]
        }
      };

      _this.openFullImage = function (index) {
        // Lightbox.openModal(_this.screenShots, index);
        // fancyboxService.
      };

      _this.appUrl = '';
      if (_this.data.application_type === 'webapp') {
        _this.appUrl = _this.data.url;
      } else {
        var url = _this.data.download_url;
        if (url.startsWith('http')) {
          _this.appUrl = url;
        } else {
          _this.appUrl = _this.data.url;
        }
      }

      _this.downloadApp = function() {
        if (localStorage.getItem('session') === 'true') {
          // user is signed in
          if (_this.data.application_type === 'webapp') {
            window.open(_this.appUrl, '_blank');
          } else {
            window.open(_this.appUrl);
          }
        } else {
          // go to signin state
          $state.go('signin', {refapp: $stateParams.appId, req: 'download'});
        }
      }

      if ($stateParams.req === 'download') {
        _this.downloadApp();
      }


    });


})();
