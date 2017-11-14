(function () {

  'use strict';

  angular.module('pb.ds.home').controller('AppDetailController',
    function ($log, $uibModal, $stateParams, app, AppFactory, fancyboxService) {

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



    });

  
})();
