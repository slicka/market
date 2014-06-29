'use strict';

var Market = require('./market');

module.exports = Map;

function Map() {
	this.markets = [];
	this.divID = '#map';

	this.renderFromAPIResponse = function(mapID, markets) {
		var ln;
		//get all my markets and make "markets" out of them
		//set up the mapbox map with the points
		//append it to the page

		ln = markets.length;
		for(var i = 0; i < ln; i++){
			markets[i] = new Market();

		}



	}

}