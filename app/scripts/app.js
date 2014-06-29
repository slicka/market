//this is our fabulous app!
'use strict';

window.uA = navigator.userAgent || '';

var config = require('./config'),
    Map 	 = require('./models/map');

module.exports = App;

function App() {
};

_.extend(App.prototype, {
  defaults: 			 config,
  closestMarkets : null,
  currentLat     : null,
  currentLong    : null,
  currentTime    : new Date(),
  currentBorough : null,
  currentProduct : null,
  currentDaysOpen: null,
  map 					 : null,

  test: function() {
    console.log('calling test function');
  },

  getLocation: function() {
    //http://diveintohtml5.info/geolocation.html
	  navigator.geolocation.getCurrentPosition(this.calculateBorough.bind(this), this.errorLocation.bind(this));
	 },

	calculateBorough: function(position) {
	  this.currentLat  = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    $.ajax({
      url: this.defaults.locationEndpoint,
      type: 'GET',
      data: {'lat': this.currentLat, 'lng': this.currentLong, 'api-key': this.defaults.nytimesApiKey}
    }).done(function(data){
      if(data.results.length > 0){
        for(i = 0; i < data.results.length; i++){
          if(data.results[i].level == 'Borough'){
            this.currentBorough = data.results[i].district;
          }
        }
      }
    });
	},

	errorLocation: function(err) {
		if (err.code == 1) {
			//user said no!
			alert('Damn girl, we need that location!');
			this.currentBorough = 0;
		}
	},

	renderMap: function(mapID) {
		var data = {
			daysopen: this.currentTime.getDay()
		}, markets = [];

		if(typeof this.currentDaysOpen !== 'undefined' && this.currentDaysOpen !== null) {
			data.daysopen = this.currentDaysOpen;
		}

		if(typeof this.currentBorough !== 'undefined' && this.currentBorough !== null) {
			data.borough = this.currentBorough;
		}

		if(typeof this.currentProduct !== 'undefined' && this.currentProduct !== null) {
			data.products = this.currentProduct;
		}

		$.ajax({
			url: this.defaults.apiEndpoint,
			type: 'GET',
			data: data,
			async: false
		}).done(function(d){
			//TODO: add error handling
			markets = d;
		});

		this.closestMarkets = markets;

		this.map = new Map();

		this.map.renderFromAPIResponse(mapID, this.closestMarkets)
	}
  
});
 