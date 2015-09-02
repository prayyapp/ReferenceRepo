app.factory('GeoService', ['$q', '$log', '$http', '$sessionStorage', function($q, $log, $http, $sessionStorage) {
  return {
    coordinatesForCity: function(address) {
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