'use strict';

var Market = require('./market'),
    MarketView = require('../views/market.js');

module.exports = Map;

function Map() {
  this.divID   = 'map';
  this.markets = [];
  this.featuredLater = null;

  this.renderFromAPIResponse = function(mapID, marketsData) {
    var map, currentLayer;

    //generate markets
    this.markets = _.map(marketsData, function(marketModel) {
      return Market.formatGeoJSON(marketModel);
    }, this);

    //set up the mapbox map with the points
    map = L.mapbox.map(this.divID, mapID, { minZoom: 11, maxZoom: 17});

    currentLayer = this.createLayer(map, this.markets);

    currentLayer.on('ready', function() {
      map.fitBounds(currentLayer.getBounds());
    });

    this.addEvents(currentLayer);
  },

  this.createLayer = function(mapObject, marketsGEOJson){
    var marketPoints, featuredLayer;
    featuredLayer = L.mapbox.featureLayer(marketsGEOJson).addTo(mapObject);
    return featuredLayer;
  },

  this.destroyLayer = function(mapObject, layerName){
    if(mapObject.hasLayer(layerName)){
      mapObject.removeLayer(layerName);
    }
  },

  this.addEvents = function(layerName){
    var marketInfo;
    
    layerName.on('click',function(e) {
      e.layer.closePopup();
      marketInfo = new MarketView(e.layer.feature);
      marketInfo.render();
      //TODO: Ante! figure out what a marketView is and create it!
    });
  //TODO: add click events to the points
  }
}
