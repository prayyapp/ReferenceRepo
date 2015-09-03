app.factory('GeoService', ['$q', '$log', '$http', '$sessionStorage', function($q, $log, $http, $sessionStorage) {
  var locations = {
    "Abidjan, Ivory Coast": {
      "lat": 5.3599517,
      "lng": -4.0082563
    },
    "Addis Ababa, Ethiopia": {
      "lat": 8.9806034,
      "lng": 38.7577605
    },
    "Ahmedabad, India": {
      "lat": 23.022505,
      "lng": 72.5713621
    },
    "Ankara, Turkey": {
      "lat": 39.9333635,
      "lng": 32.8597419
    },
    "Baghdad, Iraq": {
      "lat": 33.3128057,
      "lng": 44.3614875
    },
    "Bangkok, Thailand": {
      "lat": 13.7563309,
      "lng": 100.5017651
    },
    "Beijing, China": {
      "lat": 39.904211,
      "lng": 116.407395
    },
    "Berlin, Germany": {
      "lat": 52.52000659999999,
      "lng": 13.404954
    },
    "Bogota, Colombia": {
      "lat": 4.710988599999999,
      "lng": -74.072092
    },
    "Busan, South Korea": {
      "lat": 35.1795543,
      "lng": 129.0756416
    },
    "Cairo, Egypt": {
      "lat": 30.0444196,
      "lng": 31.2357116
    },
    "Cape Town, South Africa": {
      "lat": -33.9248685,
      "lng": 18.4240553
    },
    "Chennai, India": {
      "lat": 13.0826802,
      "lng": 80.2707184
    },
    "Dhaka, Bangladesh": {
      "lat": 23.810332,
      "lng": 90.4125181
    },
    "Dongguan, China": {
      "lat": 23.020536,
      "lng": 113.751765
    },
    "Durban, South Africa": {
      "lat": -29.85868039999999,
      "lng": 31.0218404
    },
    "Guangzhou, China": {
      "lat": 23.12911,
      "lng": 113.264385
    },
    "Hanoi, Vietnam": {
      "lat": 21.0277644,
      "lng": 105.8341598
    },
    "Ho Chi Minh City, Vietnam": {
      "lat": 10.8184631,
      "lng": 106.6588245
    },
    "Istanbul, Turkey": {
      "lat": 41.0082376,
      "lng": 28.9783589
    },
    "Jaipur, India": {
      "lat": 26.9124336,
      "lng": 75.7872709
    },
    "Jakarta, Indonesia": {
      "lat": -6.2087634,
      "lng": 106.845599
    },
    "Jeddah, Saudi Arabia": {
      "lat": 21.2854067,
      "lng": 39.2375507
    },
    "Johannesburg, South Africa": {
      "lat": -26.2041028,
      "lng": 28.0473051
    },
    "Karachi, Pakistan": {
      "lat": 24.8614622,
      "lng": 67.0099388
    },
    "Kinshasa, Democratic Republic of the Congo": {
      "lat": -4.4419311,
      "lng": 15.2662931
    },
    "Lahore, Pakistan": {
      "lat": 31.55460609999999,
      "lng": 74.3571581
    },
    "Lima, Peru": {
      "lat": -12.046374,
      "lng": -77.0427934
    },
    "London, United Kingdom": {
      "lat": 51.5073509,
      "lng": -0.1277583
    },
    "Madrid, Spain": {
      "lat": 40.4167754,
      "lng": -3.7037902
    },
    "Mexico City, Mexico": {
      "lat": 19.4326077,
      "lng": -99.133208
    },
    "Moscow, Russia": {
      "lat": 55.755826,
      "lng": 37.6173
    },
    "Mumbai, India": {
      "lat": 19.0759837,
      "lng": 72.8776559
    },
    "Nairobi, Kenya": {
      "lat": -1.2920659,
      "lng": 36.8219462
    },
    "New Taipei City, Republic of China (Taiwan)": {
      "lat": 25.0169826,
      "lng": 121.4627868
    },
    "New York City, United States": {
      "lat": 40.7127837,
      "lng": -74.0059413
    },
    "Pune, India": {
      "lat": 18.5204303,
      "lng": 73.8567437
    },
    "Pyongyang, North Korea": {
      "lat": 39.0392193,
      "lng": 125.7625241
    },
    "Rio de Janeiro, Brazil": {
      "lat": -22.9068467,
      "lng": -43.1728965
    },
    "Santiago, Chile": {
      "lat": -33.4488897,
      "lng": -70.6692655
    },
    "Sao Paulo, Brazil": {
      "lat": -23.5505199,
      "lng": -46.63330939999999
    },
    "Seoul, South Korea": {
      "lat": 37.566535,
      "lng": 126.9779692
    },
    "Shanghai, China": {
      "lat": 31.230416,
      "lng": 121.473701
    },
    "Shenyang, China": {
      "lat": 41.805699,
      "lng": 123.431472
    },
    "Singapore, Singapore": {
      "lat": 1.2800945,
      "lng": 103.8509491
    },
    "Suzhou, China": {
      "lat": 31.298974,
      "lng": 120.585297
    },
    "Tehran, Iran": {
      "lat": 35.6891975,
      "lng": 51.3889736
    },
    "Tianjin, China": {
      "lat": 39.084158,
      "lng": 117.200983
    },
    "Tokyo, Japan": {
      "lat": 35.7090259,
      "lng": 139.7319925
    },
    "Yokohama, Japan": {
      "lat": 35.4437078,
      "lng": 139.6380256
    }
  }
  return {
    //Fetches coordinates for a given address from a static list
    coordinatesForCity: function(address) {
      return $q(function(resolve, reject) {
        resolve(locations[address]);
      });
    },
    
    //Fetches coordinates for a given address live from Google's geocoding API
    liveCoordinatesForCity: function(address) {
      // Google rate-limits their geocoding API, save addresses to local storage to prevent making too many calls
      if ($sessionStorage[address]) {
        return $q(function(resolve, reject) {
          resolve($sessionStorage[address]);
        });
      } else {
        return $http({
          url: 'https://maps.googleapis.com/maps/api/geocode/json?parameters',
          method: "GET",
          params: {
            address: address,
            key: 'AIzaSyCKGI9TUyMa2trHDJ8j-xYUKIhthcYB2HA'
          }
        }).then(function(result) {
          if (result.data.error_message) {
            $log.debug('Error retrieving ' + address);
            return {};
          } else {
            $sessionStorage[address] = result.data.results[0].geometry.location;
            return $sessionStorage[address];
          }
        });
      }
    }
  }
}]);