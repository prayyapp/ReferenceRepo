var app = angular.module('MasterBlaster', []);

app.controller('BlastList', ['$scope', '$http', 'BlastService', function($scope, $http, BlastService) {
  BlastService.list().success(function(data) {
    $scope.allBlasts = data.records;
  });
}]);