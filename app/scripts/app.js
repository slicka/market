//this is our fabulous app!
'use strict';

window.uA = navigator.userAgent || '';

var config = require('./config');

module.exports = App;

function App() {

};

_.extend(App.prototype, {
  defaults: 			 config,
  closetsMarkets:  null,
  currentLat     : null,
  currentLong    : null,
  currentTime    : new Date(),
  currentBorough : null,
  test: function () {
    console.log('calling test function');
  },

  getLocation: function(){
	   //http://diveintohtml5.info/geolocation.html
	   navigator.geolocation.getCurrentPosition(this.calculateBorough, this.errorLocation);
	 },

	calculateBorough: function(position){
	  this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    $.ajax({
      url: this.defaults.locationEndpoint,
      type: 'GET',
      data: {lat: this.currentLat, lng: this.currentLong, api-key: this.defaults.nytimesApiKey}
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

	errorLocation: function(err){
		if (err.code == 1) {
			//user said no!
			alert('Damn girl, we need that location!');
			this.currentBorough = 0;
		}
	},

	renderMap: function(mapId){

	},

	getClosestMarkets: function(){

	}

  
});
 