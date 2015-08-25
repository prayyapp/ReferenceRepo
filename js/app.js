var app = angular.module('MasterBlaster', []);

app.controller('BlastList', ['$scope', '$http', 'BlastService', function($scope, $http, BlastService) {
  BlastService.list().success(function(data) {
    $scope.allBlasts = $scope.removeInactiveUsers(data.records);
  });
  
  $scope.removeInactiveUsers = function(blasts){
    return $.grep(blasts, function(blast,idx){
      return blast.Active == 'TRUE';
    });
  }
}]);

app.filter('blastRepClass', function(){
  return function(blast) {
    if(blast.Rep > 8){
      return 'high-rep';
    } else {
      return 'normal-rep';
    }
  }
});