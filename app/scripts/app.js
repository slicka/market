//this is our fabulous app!
'use strict';

window.uA = navigator.userAgent || '';

var config = require('./config');

module.exports = App;

function App() {
};

_.extend(App.prototype, {
  defaults       : config,
  currentLat     : null,
  currentLng     : null,
  currentTime    : new Date(),
  closetsMarkets : null,
  currentBorough : null,

  test: function() {
    console.log('calling test function');
  },

  getLocation: function() {
    //http://diveintohtml5.info/geolocation.html
	  navigator.geolocation.getCurrentPosition(this.calculateBorough.bind(this), this.errorLocation);
	 },

	calculateBorough: function(position) {
	  this.currentLat = position.coords.latitude;
    this.currentLng = position.coords.longitude;

    $.get(this.defaults.locationEndpoint, {'latlng': this.currentLat + ',' + this.currentLng}, function(data) {
        console.log(data);
    }).done(function(data) {
        console.log(data);
      })
      .fail(function(data) {
        console.log(JSON.parse(data.responseText));
      });
	},

	errorLocation: function(err) {
		if (err.code == 1) {
			//user said no!
			alert('Damn girl, we need that location!');
			this.currentBorough = 0;
		}
	},

	renderMap: function(mapId) {

	},

	getClosestMarkets: function() {

	}

  
});
 