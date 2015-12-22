angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */

.factory('Users', function(){
  var this_user = [];
  return {
    store: function(user){
      this_user.push(user);
      return this_user[0];
    },
    get: function(){
      return this_user[0];
    }
  }

})

.factory('Places', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var places = [{
    id: 0,
    name: 'Error'
  }, {
    id: 1,
    name: 'Parking Building',
    image: 'img/parking_building.png'
  }, {
    id: 2,
    name: 'Outdoor Parking',
    image: 'img/outdoor.png'
  }, {
    id: 3,
    name: 'Football Field',
    image: 'img/football_field.png'
  }, {
    id: 4,
    name: 'SIT',
    image: 'img/SIT.png'
  }, {
    id: 5,
    name: 'SEEM',
    image: 'img/seem.png'
  }, {
    id: 6,
    name: 'Faculty of Science',
    image: 'img/FoS.png'
  }];


  return {
    all: function() {
      return places;
    },
    get: function(placeId) {
      // Simple index lookup
      return places[placeId];
    }
  }
});
