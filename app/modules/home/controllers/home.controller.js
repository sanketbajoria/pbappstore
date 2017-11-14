(function () {

  'use strict';

  angular.module('pb.ds.home').controller('HomeController',
    function ($log, $uibModal, AppFactory, $state) {

      var _this = this;

      _this.filter = {
        OS: [
          { label: 'Android', searchValue: ['Android'] },
          { label: 'iOS', searchValue: ['iPhone', 'iPad'] },
          { label: 'Windows Phone', searchValue: ['WindowsPhone'] }]
      };

      _this.open = function (item) {
        $uibModal.open({
          templateUrl: 'modules/home/templates/modal.html',
          controller: 'ModalController as modal',
          size: 'md',
          resolve: {
            itemResolve: function () {
              return item;
            }
          }
        });
      };
      _this.categories = [];
      AppFactory.categories.then(function (categories) {
        _this.categories = categories;
      });

      _this.openApp = function (app) {
        $state.go('appDetail', { appId: app.id });
      };

      var apps = [];
      AppFactory.getApps().then(function (a) {
        apps = a;
      });

      _this.getPlatformAppCount = function (platform) {
        var filteredCategories = _this.categories.filter(function (c) {
          return c.id !== 167 && c.selected;
        });
        return apps.filter(function (a) {
          var ret = platform.searchValue.filter(function (v) {
            return a.platforms.indexOf(v) >= 0;
          }).length > 0;
          if (_this.filter.searchText) {
            ret = ret && a.name.toLowerCase().indexOf(_this.filter.searchText.trim().toLowerCase()) >= 0;
          }

          
          if (filteredCategories.length > 0) {
            ret = ret && filteredCategories.filter(function (c) {
              return a.categories.indexOf(c.label) >= 0;  
            }).length > 0;
          }
          return ret;
        }).length;
      };

      _this.getApp = function (category) {
        return apps.filter(function (a) {
          var filteredOS = _this.filter.OS.filter(function (o) {
            return o.selected;
          }).reduce(function (r, p) {
            r = r.concat(p.searchValue);
            return r;
          }, []);

          var ret = true;
          if (filteredOS.length > 0) {
            ret = ret && filteredOS.filter(function (v) {
              return a.platforms.indexOf(v) >= 0;
            }).length > 0;
          }
          if (_this.filter.searchText) {
            ret = ret && a.name.toLowerCase().indexOf(_this.filter.searchText.trim().toLowerCase()) >= 0;
          }
          if (category) {
            ret = ret && a.categories.indexOf(category.label) >= 0;
          }
          return ret;
        });
      };

      _this.appCount = function () {
        var filteredCategories = _this.categories.filter(function (c) {
          return c.id !== 167 && c.selected;
        });
        return apps.filter(function (a) {
          var filteredOS = _this.filter.OS.filter(function (o) {
            return o.selected;
          }).reduce(function (r, p) {
            r = r.concat(p.searchValue);
            return r;
          }, []);

          var ret = true;
          if (filteredOS.length > 0) {
            ret = ret && filteredOS.filter(function (v) {
              return a.platforms.indexOf(v) >= 0;
            }).length > 0;
          }
          if (_this.filter.searchText) {
            ret = ret && a.name.toLowerCase().indexOf(_this.filter.searchText.trim().toLowerCase()) >= 0;
          }
          if (filteredCategories.length > 0) {
            ret = ret && filteredCategories.filter(function (c) {
              return a.categories.indexOf(c.label) >= 0;
            }).length > 0;
          }
          return ret;
        }).length;
      };

      _this.getCategories = function () {
        var isAllSelected = _this.categories.filter(function (c) {
          return c.id === 167 && c.selected;
        }).length > 0;
        var isNoneSelected = _this.categories.filter(function (c) {
          return c.selected;
        }).length === 0;

        if (isAllSelected || isNoneSelected) {
          return _this.categories.filter(function (c) {
            return c.id !== 167 && _this.getApp(c).length > 0;
          });
        } else {
          return _this.categories.filter(function (c) {
            return c.id !== 167 && c.selected && _this.getApp(c).length > 0;
          });
        }
      };

      _this.settings = {
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          }
        ]
      };
    });

})();
