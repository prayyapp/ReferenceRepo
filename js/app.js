var app = angular.module('MasterBlaster', ['uiGmapgoogle-maps', 'ngStorage']);

app.controller('BlastList', ['$scope', '$http', 'BlastService', 'AdService', 'GeoService', '$timeout', function($scope, $http, BlastService, AdService, GeoService, $timeout) {
  var adPeriod = 4;
  BlastService.list().success(function(blastFeed) {
    AdService.list().success(function(adFeed) {
      $scope.allBlasts = injectAds(removeInactiveUsers(randomizeArray(blastFeed.records)), randomizeArray(adFeed.records), adPeriod);
      $scope.loadPins(blastFeed.records);
    });
  });

  $scope.pins = [];
  $scope.map = {
    center: {
      latitude: 30,
      longitude: -99
    },
    zoom: 2
  };

  $scope.loadPins = function(blasts) {
    var locations = {};
    $.each(blasts, function(i, v) {
      var loc = v.City + ', ' + v.Country;
      if (!locations[loc]) {
        locations[loc] = 0
      }
      locations[loc] += 1
    });

    function fetchLocations() {
      //Google Map loads asynchronously, need to wait for it to load
      if (google.maps.Size == undefined) {
        $timeout(fetchLocations, 10);
        return;
      }

      $.each(locations, function(loc, count) {
        GeoService.coordinatesForCity(loc).then(function(data) {
          $scope.pins.push({
            title: loc,
            id: loc,
            latitude: data.lat,
            longitude: data.lng,
            icon: {
              url: 'http://www.clker.com/cliparts/U/8/J/z/5/D/google-maps-icon-blue-hi.png',
              scaledSize: new google.maps.Size(18, 28),
            },
            opts: {
              labelContent: '' + count,
              labelAnchor: "3 24",
              labelClass: 'labelClass',
              labelInBackground: true
            },
          });
        });
      });
    };
    fetchLocations();

  };

  var removeInactiveUsers = function(blasts) {
    return $.grep(blasts, function(blast, idx) {
      return blast.Active == 'TRUE';
    });
  };

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
  };

  var randomizeArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

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