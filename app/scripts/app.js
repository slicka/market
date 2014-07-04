//this is our fabulous app!
'use strict';

window.uA = navigator.userAgent || '';

var config = require('./config'),
    Map    = require('./models/map');

module.exports = App;

function App() {
};

_.extend(App.prototype, {
  defaults        : config,
  map             : null,
  currentLat      : null,
  currentLng      : null,
  currentTime     : new Date(),
  currentBorough  : null,
  currentProduct  : null,
  currentDaysOpen : null,
  closetsMarkets  : null,

  getLocation: function() {
    //http://diveintohtml5.info/geolocation.html
    navigator.geolocation.getCurrentPosition(this.calculateBorough.bind(this), this.errorLocation.bind(this));
   },

  getMarkets: function(data) {
    var result = [];

    $.ajax({
      url: this.defaults.apiEndpoint,
      type: 'GET',
      data: data,
      async: false
    }).done(function(res){
      //TODO: add error handling
      result = res;
    });

    return result;
  },

  setMarketsData: function() {
    var data = {};

    if(typeof this.currentDaysOpen !== 'undefined' && this.currentDaysOpen !== null) {
      data.daysopen = this.currentDaysOpen;
    } else {
      data.daysopen = this.currentTime.getDay()
    }

    if(typeof this.currentBorough !== 'undefined' && this.currentBorough !== null) {
      data.borough = this.currentBorough;
    }

    if(typeof this.currentProduct !== 'undefined' && this.currentProduct !== null) {
      data.products = this.currentProduct;
    }

    return data;
  },

  calculateBorough: function(position) {
    this.currentLat = position.coords.latitude;
    this.currentLng = position.coords.longitude;

    $.get(this.defaults.locationEndpoint, {'latlng': this.currentLat + ',' + this.currentLng}, function(data) {
      console.log(data);
    }).done(function(data) {
        currentBorough = data.result.id
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

  renderMap: function(mapID) {
    var requestData = this.setMarketsData();

    this.closestMarkets = this.getMarkets(requestData);

    this.map = new Map();

    this.map.renderFromAPIResponse(mapID, this.closestMarkets);
  }
  
});
 