'use strict';

var Market     = require('./market'),
    MarketView = require('../views/market.js');

module.exports = Map;

function Map(mapContainerID) {
  this.markets        = [];
  this.featuredLater  = null;
  this.mapContainerID = mapContainerID || 'map';
}

_.extend(Map.prototype, {
  renderFromAPIResponse: function(mapID, marketsData) {
    var map, currentLayer;

    //generate markets
    this.markets = _.map(marketsData, function(marketModel) {
      return Market.formatGeoJSON(marketModel);
    }, this);

    //set up the mapbox map with the points
    map = L.mapbox.map(this.mapContainerID, mapID, { minZoom: 11, maxZoom: 17 });

    currentLayer = this.createLayer(map, this.markets);

    currentLayer.on('ready', function() {
      map.fitBounds(currentLayer.getBounds());
    });

    this.addEvents(currentLayer);
  },

  createLayer: function(mapObject, marketsGEOJson) {
    var marketPoints, featuredLayer;

    featuredLayer = L.mapbox.featureLayer(marketsGEOJson).addTo(mapObject);

    return featuredLayer;
  },

  destroyLayer: function(mapObject, layerName) {
    if (mapObject.hasLayer(layerName)) {
      mapObject.removeLayer(layerName);
    }
  },

  addEvents: function(layerName) {
    var marketInfo;

    layerName.on('click',function(e) {
      e.layer.closePopup();
      marketInfo = new MarketView(e.layer.feature.properties);
      marketInfo.render();
    });
  }
});


