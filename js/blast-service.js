app.factory('BlastService', ['$http', function($http) {
  return {
    list: function() {
      return $http.get('https://raw.githubusercontent.com/CSCO-DevOps-Bootcamp/ReferenceRepo/datafeeds/blastfeed.json');
    }
  }
}]);