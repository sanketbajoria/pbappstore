(function () {

  'use strict';

  angular.module('pb.ds.home').controller('AppDetailController',
    function ($log, $uibModal, $stateParams, app) {

      var _this = this;

      _this.data = app;

      _this.filter = {
        OS: [
          { label: 'Android', searchValue: ['Android'] },
          { label: 'iOS', searchValue: ['iPhone', 'iPad'] },
          { label: 'Windows Phone', searchValue: ['WindowsPhone'] }]
      };


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
    });
})();
