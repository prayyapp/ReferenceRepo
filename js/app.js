var app = angular.module('MasterBlaster', []);

app.controller('BlastList', ['$scope', '$http', 'BlastService', 'AdService', function($scope, $http, BlastService, AdService) {
  var adPeriod = 4;
  BlastService.list().success(function(blastFeed) {
    AdService.list().success(function(adFeed) {
      $scope.allBlasts = injectAds(removeInactiveUsers(blastFeed.records), adFeed.records, adPeriod);
    });
  });

  var removeInactiveUsers = function(blasts) {
    return $.grep(blasts, function(blast, idx) {
      return blast.Active == 'TRUE';
    });
  }

  var injectAds = function(blasts, ads, period) {
    var injected = [];
    $.each(blasts, function(idx, blast) {
      injected.push($.extend({
        type: 'blast'
      }, blast));
      if (idx % period == 0 && idx > 0) {
        injected.push($.extend({
          type: 'ad'
        }, ads[idx % (ads.length - 1)]));
      }
    });
    return injected;
  }
}]);

app.filter('blastRepClass', function() {
  return function(blast) {
    if (blast.Rep > 8) {
      return 'high-rep';
    } else {
      return 'normal-rep';
    }
  }
});

app.filter('blastPostCount', function() {
  return function(blast) {
    if (blast.Blasts > 7000) {
      return 'gold';
    } else if (blast.Blasts > 4000) {
      return 'blue';
    } else {
      return 'transparent';
    }
  }
});