(function () {

  'use strict';

  angular.module('pb.ds.home').controller('HomeController',
    function ($log, $uibModal, AppFactory) {

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
        categories.forEach(function (c) {
          if (c.id === 167) {
            _this.selectedCategory = c;
          }
        });
      });


      _this.categoryChanged = function (category) {
        _this.selectedCategory = category;
      };

      var apps = [];
      AppFactory.getApps().then(function (a) {
        apps = a;
      });

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
            }).length > 0 && a.categories.indexOf(category.label) >= 0;
          }
          if (_this.filter.searchText) {
            ret = ret && a.name.toLowerCase().indexOf(_this.filter.searchText.trim().toLowerCase()) >= 0;
          }
          ret = ret && a.categories.indexOf(category.label) >= 0;
          return ret;
        });
      };

      _this.getCategories = function () {
        return _this.categories.filter(function (c) {
          if (c.id !== 167) {
            if (_this.selectedCategory.id === 167) {
              return true;
            } else {
              return _this.selectedCategory.id === c.id;
            }
          }
        });
      };
    });

})();
