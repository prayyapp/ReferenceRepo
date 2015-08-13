var app = angular.module('MasterBlaster', []);

app.controller('BlastList', ['$scope', '$http', function($scope, $http) {
  var allBlasts = [],
    displayLength = 5,
    currentIndex = 0;

  $scope.visibleBlasts = [];

  $scope.scroll = function(amount) {
    //clear visible list
    $scope.visibleBlasts.length = 0;

    //update current index, keeping range between 0 and total size of the blasts list (minus the visible window size)
    currentIndex = Math.min(Math.max(currentIndex + amount, 0), allBlasts.length - 1 - displayLength);
    
    //merge the slice of the blasts chosen into the visibleBlasts scope variable
    $.merge($scope.visibleBlasts, allBlasts.slice(currentIndex, currentIndex + displayLength));
  };

  //fetch the complete blasts list
  $http.get('https://raw.githubusercontent.com/CSCO-DevOps-Bootcamp/ReferenceRepo/datafeeds/blastfeed.json').success(function(data) {
    allBlasts = data.records;
    $scope.scroll(0);
  });
}]);

app.directive('userBlast', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      blast: '='
    },
    templateUrl: 'blast.html'
  };
});