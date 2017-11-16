(function () {

  'use strict';

  angular.module('pb.ds.home').controller('AppDetailController',
    function ($log, $uibModal, $state, $stateParams, app, AppFactory, fancyboxService, AuthFactory) {

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

      _this.comments = [];
      _this.ratingObj = {
        enabled: false,
        total: 0,
        star5: 0,
        star4: 0,
        star3: 0,
        star2: 0,
        star1: 0,
        starp5: 0,
        starp4: 0,
        starp3: 0,
        starp2: 0,
        starp1: 0,
        average: 0,
      };
      AppFactory.getComments(app.id).then(function (comments) {
        if (comments.length > 0) {
          _this.ratingObj.total = comments.length;

          _this.ratingObj.enabled = true;
          var totalRating = 0;
          comments.forEach(function (comm) {
            var rating = parseInt(comm.rating);
            _this.ratingObj["star" + rating]++;
            totalRating += rating;
          });
          var totalRatingCount = comments.length;

          _this.ratingObj.average = totalRating / comments.length;
          _this.ratingObj.average = _this.ratingObj.average.toFixed(1);
          _this.ratingObj.starp5 = (_this.ratingObj.star5 / totalRatingCount) * 100; 
          _this.ratingObj.starp4 = (_this.ratingObj.star4 / totalRatingCount) * 100; 
          _this.ratingObj.starp3 = (_this.ratingObj.star3 / totalRatingCount) * 100; 
          _this.ratingObj.starp2 = (_this.ratingObj.star2 / totalRatingCount) * 100; 
          _this.ratingObj.starp1 = (_this.ratingObj.star1 / totalRatingCount) * 100; 
          _this.ratingObj.enabled = true;
        }
        _this.comments = comments;
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

      _this.downloadApp = function () {
        if (localStorage.getItem('session') === 'true') {
          // user is signed in
          if (_this.data.application_type === 'webapp') {
            window.open(_this.appUrl, '_blank');
          } else {
            window.open(_this.appUrl);
          }
        } else {
          // go to signin state
          $state.go('signin', { refapp: $stateParams.appId, req: 'download' });
        }
      }

      if ($stateParams.req === 'download') {
        _this.downloadApp();
      }


    });


})();
