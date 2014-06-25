//this is our fabulous app!
(function{
	'use strict';

	window.uA = navigator.userAgent || '';

	var app = {
		defaults: {
			mapId : 'slickaslicka.ijln098d',
			apiPath: '',
			nyTimesApi: 'http://api.nytimes.com/svc/politics/v2/districts.json'
		},

		closetsMarkets = null,

		currentBorough = null,
		currentLat = null,
		currentLat = null,

		currentTime = new Date();
	};

	window.app = app;

	function initialize(){
		//lots of magic!
		//first see if we can get the location
			//if we can, lets map the location to a borough
			//if we can't, let's show a message and set them to no borough
		//after setting the borough or not, we can check here if we have it, and then get closest markets
			//otherwise lets just get 5 random open markets

		app.getLocation();

		if(app.currentBorough !== null){
			app.closestMarkets = app.getClosestMarkets();
		}

		app.renderMap(app.defaults.mapId);
	}

	function renderMap(mapId){

	}

	function getClosestMarkets(){
		//this function should ping the api to get the closest markets!
	}

	function getLocation(){
		//http://diveintohtml5.info/geolocation.html
		navigator.geolocation.getCurrentPosition(app.calculateBorough, app.errorLocation);
	}

	function calculateBorough(position){
		app.currentLat = position.coords.latitude;
  		app.currentLong = position.coords.longitude;

  		//now we should map these coordinates somehow...
  		//?lat=40.606031&lng=-74.082686
  		$.ajax({
  			url: app.defaults.nyTimesApi,
  			type: 'GET',
  			data: {lat: app.currentLat, lng: app.currentLong}
  		}).done(function(data){
  			if(data.results.length > 0){
  				for(i = 0; i < data.results.length; i++){
  					if(data.results[i].level == 'Borough'){
  						app.currentBorough = data.results[i].district;
  					}
  				}
  			}
  		});
	}

	function errorLocation(err){
		if (err.code == 1) {
    		//user said no!
    		alert('Damn girl, we need that location!');
    		app.currentBorough = 0;
  		}
	}




	$(initialize);

})();