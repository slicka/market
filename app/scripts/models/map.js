'use strict';

var Market = require('./market');

module.exports = Map;

function Map() {
	this.markets = [];
	this.divID = 'map';

	this.renderFromAPIResponse = function(mapID, marketsData) {
    var map, featureLayer;
    //generate markets
    this.markets = _.map(marketsData, function(marketModel) {
      return Market.formatGeoJSON(marketModel);
    }, this);

    //set up the mapbox map with the points
    map = L.mapbox.map(this.divID, mapID);
    featureLayer = L.mapbox.featureLayer(this.markets).addTo(map);

    featureLayer.on('ready', function() {
      map.fitBounds(featureLayer.getBounds());
    });

    //TODO: add click events to the points
	}

}