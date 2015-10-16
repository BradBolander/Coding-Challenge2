var ang = angular.module('ArtistsApp', ['ui.bootstrap']);

// Loading data into Artists variable
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


//////////////////////////////////////////////////////////////////////////////////////
//                                STATISTICS CONTROLLER                             //
//////////////////////////////////////////////////////////////////////////////////////
ang.controller('StatisticsController', ['$scope', function($scope) {
  $scope.totalItems = Artists.length;
  $scope.thisMonth = 0;
  $scope.lastMonth = 0;

  var date = new Date();
  var curMonth = date.getMonth();
  var lastMonth = date.getMonth() - 1;
  if (curMonth < 10) {
    curMonth = '0' + curMonth;
  };
  if (lastMonth < 10) {
    lastMonth = '0' + lastMonth;
  };

  for (var i = 0; i < Artists.length; i++) {
    var temp = '';
    temp = Artists[i].created_at.charAt(5) + Artists[i].created_at.charAt(6);
    if (temp == curMonth) {
      $scope.thisMonth++;

    };
    if (temp == lastMonth) {
      $scope.lastMonth++;
    };
  };

  //////////////////////////////////////////////////////////////////////////////////////
  //                                CHART LOGIC                                       //
  //////////////////////////////////////////////////////////////////////////////////////
  var ctx = document.getElementById("myChart").getContext("2d");

  var data = {
    labels: ["1 Month", "2 Months", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "Signups",
      fillColor: "rgba(255, 59, 59, 0.2)",
      strokeColor: "rgba(255, 96, 80, 1)",
      pointColor: "rgba(255, 157, 157, 1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 80, 81, 56, 55, 4]
    }]
  };

  var getArtistsForDayOfYear = function(day) {
    var signups = [];
    for (var i = 0; i < Artists.length; i++) {
      var working = new Date(Artists[i].created_at);
      var start = new Date(working.getFullYear(), 0, 0);
      var diff = working - start;
      var oneDay = 1000 * 60 * 60 * 24;
      var workingDay = Math.floor(diff / oneDay);
      if (workingDay == day) {
        signups.push(Artists[i]);
      };
    };
    return signups.length;
  };

  var dataArray = [];
  var dataLabels = [];

  var dayOfYear = function() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    return day;
  };

  //Initial chart
  for (var i = 0; i < dayOfYear(); i++) {
    if (i > dayOfYear() - 30){
      var temp = getArtistsForDayOfYear(i);
      dataArray.push(temp);
      dataLabels.push(i+1);
    };
  };
  data.datasets[0].data = dataArray;
  data.labels = dataLabels;
  var myNewChart = new Chart(ctx).Line(data);

  // Single month chart
  $('#month1').on('click', function() {
    dataArray = [];
    dataLabels = [];
    myNewChart.destroy();

    for (var i = 0; i < dayOfYear(); i++) {

      if (i > dayOfYear() - 30)
      {
        var temp = getArtistsForDayOfYear(i);
        dataArray.push(temp);
        dataLabels.push(i + 1);
      };
    };

    data.datasets[0].data = dataArray;
    data.labels = dataLabels;
    var ctx = document.getElementById("myChart").getContext("2d");
    myNewChart = new Chart(ctx).Line(data);

    myNewChart.update();

  });

  // Two month chart
  $('#month2').on('click', function() {
    dataArray = [];
    dataLabels = [];
    myNewChart.destroy();

    for (var i = 0; i < dayOfYear(); i++) {

      if (i > dayOfYear() - 60)
      {
        var temp = getArtistsForDayOfYear(i);
        dataArray.push(temp);
        dataLabels.push(i + 1);
      };
    };

    data.datasets[0].data = dataArray;
    data.labels = dataLabels;
    var ctx = document.getElementById("myChart").getContext("2d");
    myNewChart = new Chart(ctx).Line(data);

    myNewChart.update();

  });

  //Six month chart
  $('#month6').on('click', function() {
    dataArray = [];
    dataLabels = [];
    myNewChart.destroy();

    for (var i = 0; i < dayOfYear(); i++) {

      if (i > dayOfYear() - 180)
      {
        var temp = getArtistsForDayOfYear(i);
        dataArray.push(temp);
        dataLabels.push(i + 1);
      };
    };

    data.datasets[0].data = dataArray;
    data.labels = dataLabels;
    var ctx = document.getElementById("myChart").getContext("2d");
    myNewChart = new Chart(ctx).Line(data);

    myNewChart.update();

  });

  //Year chart
  $('#year').on('click', function() {
    dataArray = [];
    dataLabels = [];
    myNewChart.destroy();

    for (var i = 0; i < dayOfYear(); i++) {
        var temp = getArtistsForDayOfYear(i);
        dataArray.push(temp);
        dataLabels.push(i + 1);
    };

    data.datasets[0].data = dataArray;
    data.labels = dataLabels;
    var ctx = document.getElementById("myChart").getContext("2d");
    myNewChart = new Chart(ctx).Line(data);

    myNewChart.update();

  });
}]);




//////////////////////////////////////////////////////////////////////////////////////
//                                TABLE CONTROLLER                                  //
//////////////////////////////////////////////////////////////////////////////////////
ang.controller('TableController', ['$scope', '$log', function($scope, $log) {
  $scope.totalItems = Artists.length;
  $scope.currentPage = 1;
  $scope.reverse = true;
  $scope.filter = '';
  $scope.sort = function(filter) {
    $scope.reverse = ($scope.filter === filter) ? !$scope.reverse : false;
    $scope.filter = filter;
    console.log(filter);
    console.log($scope.reverse);
  };

  $scope.imageHandler = function(image) {
    if (image.includes('https://') || image.includes('http://')) {
      return image;
    } else {
      image = 'http://www.bucketfeet.com' + image;
      return image;
    };
  };

  $scope.setPage = function(pageNo) {
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
