var ang = angular.module('ArtistsApp', ['ui.bootstrap']);

var Artists = (function() {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "/javascripts/artists-lite.json",
    'dataType': "json",
    'success': function(data) {
      json = data;
    }
  });
  return json;
})();



ang.controller('TableController', ['$scope', '$log', function($scope, $log) {
  $scope.totalItems = Artists.length;
  $scope.currentPage = 1;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 10;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
  $scope.Artists = Artists;
  $scope.itemsPerPage = 50;
  console.log($scope.Artists);


}]);
