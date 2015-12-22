angular.module('starter.controllers', ['uiGmapgoogle-maps'])

.controller('LoginCtrl', function($scope, $state) {
  $scope.fbLogin = function() {
    openFB.login(
      function(){
        $state.go('home');
      },
    {scope: 'email'});
  }
})

.controller('HomeCtrl', function($scope, $http, Places, $interval) {



  $scope.map = {center: { latitude: 13.65065, longitude: 100.4943833 }, zoom :16};
  $scope.options = {
    scrollwheel: false,
    draggable: true
  };


  $scope.showParkingBuilding = function(){
    $scope.marker.coords = {
      latitude: 13.6503429,
      longitude: 100.4957396
    };
    $scope.map = {center: { latitude: 13.6503429, longitude: 100.4957396 }, zoom :16};
    $scope.place = "Parking Building",
    $scope.id = 1
  }

  $scope.showOutdoorParking = function(){
    $scope.marker.coords = {
      latitude: 13.6508172,
      longitude: 100.4939128
    };
    $scope.map = {center: { latitude: 13.6508172, longitude: 100.4939128 }, zoom :16};
    $scope.place = "Outdoor Parking",
    $scope.id = 2
  }

  $scope.showFootballParking = function(){
    $scope.marker.coords = {
      latitude: 13.6509037,
      longitude: 100.4925
    };
    $scope.map = {center: { latitude: 13.6509037, longitude: 100.4925 }, zoom :16};
    $scope.place = "Football Field",
    $scope.id = 3
  }

  $scope.showSIT = function(){
    $scope.marker.coords = {
      latitude: 13.6520917,
      longitude: 100.4939893
    };
    $scope.map = {center: { latitude: 13.6520917, longitude: 100.4939893 }, zoom :16};
    $scope.place = "SIT",
    $scope.id = 4
  }

  $scope.showSEEM = function(){
    $scope.marker.coords = {
      latitude: 13.649273,
      longitude: 100.493846
    };
    $scope.map = {center: { latitude: 13.649273, longitude: 100.493846 }, zoom :16};
    $scope.place = "SEEM",
    $scope.id = 5
  }

  $scope.showFoS = function(){
    $scope.marker.coords = {
      latitude: 13.653068,
      longitude: 100.494608
    };
    $scope.map = {center: { latitude: 13.653068, longitude: 100.494608 }, zoom :16};
    $scope.place = "Faculty of Science",
    $scope.id = 6
  }

  $scope.marker = {
    id: 0,
    coords: {
      latitude: 13.650928,
      longitude: 100.4943833
    },
    options: { draggable: false, visible: false }
  };

  function geolocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = position.coords;

      $scope.currentPos = {
        id : 8,
        coords: {
          "latitude": pos.latitude,
          "longitude": pos.longitude
        },
        icon: "img/currentPosition.png" ,
        options: { draggable: false, visible: true }
      };

      if(pos.longitude<=100.496788&&pos.longitude>=100.490962&&pos.latitude<=13.654275&&pos.latitude>=13.648051){
        $scope.user_location = 1;
      } else {
        $scope.user_location = 0;
      };

      var s = [];

      s1lat = Math.abs(pos.latitude-13.6503429);
      s1long = Math.abs(pos.longitude-100.4957396);
      s[0] = s1lat + s1long;
      s2lat = Math.abs(pos.latitude-13.6508172);
      s2long = Math.abs(pos.longitude-100.4939128);
      s[1] = s2lat + s2long;
      s3lat = Math.abs(pos.latitude-13.6509037);
      s3long = Math.abs(pos.longitude-100.4925);
      s[2] = s3lat + s3long;
      s4lat = Math.abs(pos.latitude-13.6520917);
      s4long = Math.abs(pos.longitude-100.4939893);
      s[3] = s4lat + s4long;
      s5lat = Math.abs(pos.latitude-13.649273);
      s5long = Math.abs(pos.longitude-100.493846);
      s[4] = s5lat + s5long;
      s6lat = Math.abs(pos.latitude-13.653068);
      s6long = Math.abs(pos.longitude-100.494608);
      s[5] = s6lat + s6long;

      var min = s[0];
      var result = 0;
      for(var i=0; i<6; i++){
        if(s[i]<min){
          min = s[i];
          result = i;
        }
      }

      result += 1;
      $scope.nearest = result;
      $scope.$apply();
    });
  }

  geolocation();

  $scope.showCurrent = function(){
    $scope.map = {center: { latitude: pos.latitude, longitude: pos.longitude }, zoom :16};
    geolocation();
  };

  openFB.api({
    path: '/me',
    params: {fields: 'id,name'},
    success: function(user) {
      $scope.$apply(function() {
        $scope.user = user;
        window.localStorage['name'] = user.name;
        window.localStorage['user'] = user.id;
      });
    },
    error: function(error) {
      alert('Facebook error: ' + error.error_description);
    }
  });
  callAvailable();
  $interval(callAvailable,5000);


  function callAvailable() {
      $http({
        url: 'http://www.winwanwon.in.th/nsc2015/fetch_available.php',
        method: "POST",
        timeout: 5000
      }).success(function(data, status, headers, config) {
        $scope.data = data;
        console.log(data);
      });
  }

    $http({
      url: 'http://www.winwanwon.in.th/nsc2015/status.php',
      method: "POST",
      data: {"user_id": window.localStorage['user']}
    }).success(function(data, status, headers, config) {
      $scope.user_status = data;
    });

  $scope.cancelPark = function(){
    $http({
      url: 'http://www.winwanwon.in.th/nsc2015/cancel_request.php',
      method: "POST",
      data: {"name": window.localStorage['name'], "user_id": window.localStorage['user'] }
    }).success(function(data, status, headers, config) {
      $scope.user_status = null;
    });
    $scope.user_status = null;
  }

})

.controller('ParkCtrl', function($scope, $stateParams, Places, Users, $http){

  $http({
    url: 'http://www.winwanwon.in.th/nsc2015/parking_request.php',
    method: "POST",
    data: {"id": $stateParams.placeId, "name": window.localStorage['name'], "user_id": window.localStorage['user'] }
  }).success(function(data, status, headers, config) {
    $scope.available = data.available;
    $scope.max = data.max;
    console.log(status);
    console.log(data);
    $http({
      url: 'http://www.winwanwon.in.th/nsc2015/people.php',
      method: "POST",
      data: {"id": $stateParams.placeId, "name": window.localStorage['name'], "user_id": window.localStorage['user'] }
    }).success(function(data, status, headers, config) {
      $scope.people = data;
      console.log(status);
      console.log(data);

      $http({
        url: 'http://www.winwanwon.in.th/nsc2015/fetch_comment.php',
        method: "POST",
        data: {"id": $stateParams.placeId, "user_id": window.localStorage['user'] }
      }).success(function(data, status, headers, config) {
        $scope.comments = data;
        console.log(data);
      });
    });
  });
  $scope.place = Places.get($stateParams.placeId);
  $scope.cancelPark = function(){
    $http({
      url: 'http://www.winwanwon.in.th/nsc2015/cancel_request.php',
      method: "POST",
      data: {"id": $stateParams.placeId, "name": window.localStorage['name'], "user_id": window.localStorage['user'] }
    }).success(function(data, status, headers, config) {
      console.log(status);
      console.log(data);
    });
  }
  $scope.submitComment = function(){
    $http({
      url: 'http://www.winwanwon.in.th/nsc2015/comment.php',
      method: "POST",
      data: {"id": $stateParams.placeId, "name": window.localStorage['name'], "user_id": window.localStorage['user'], "content": $scope.comment }
    }).success(function(data, status, headers, config) {
      $scope.this_comment = $scope.comment;
      $scope.comment = "";
      $scope.this_username = window.localStorage['name'];
      $scope.this_userid = window.localStorage['user'];
    });
  }
});
