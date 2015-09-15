app.factory('AdService', ['$http', function($http) {
  return {
    list: function() {
      return $http.get('https://raw.githubusercontent.com/cscobootcamp/referencerepo/ph5_datafeeds/adfeed.json');
    }
  }
}]);