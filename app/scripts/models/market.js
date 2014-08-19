'use strict';

module.exports = Market;

function Market(attributes){
  _.extend(this, attributes);
}

_.extend(Market, {
  formatGeoJSON: function(attributes) {
    attributes = attributes || {};

    return new Market(_.extend({}, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          attributes.lng,
          attributes.lat 
        ]
      },
      properties: {
        'url'         : attributes.url,
        'ebt'         : attributes.ebt,
        'name'        : attributes.name,
        'street'      : attributes.street,
        'borough'     : attributes.borough,
        'battery'     : attributes.battery,
        'compost'     : attributes.compost,
        'textile'     : attributes.textile,
        'daysopen'    : this.getDaysOpen(attributes.daysopen),
        'products'    : attributes.products,
        'dateclose'   : this.formatDate(attributes.dateclose),
        'timesopen'   : attributes.timesopen,
        'yearround'   : attributes.yearround,
        'description' : attributes.description,
        'farmer_days' : attributes.farmer_days,
        'marker-size' : 'medium',
        'marker-color': '#FA837B',
        'product_days': attributes.product_days
      }
    }));
  },

  getDaysOpen: function(days) {
    var i,
        daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        result    = [];

    for(i=0; i < days.length; i++) {
      result.push(daysArray[days[i]]);
    }

    return result.join(', ');
  },

  formatDate: function(timestamp) {
    return new Date(timestamp*1000).toString().slice(0,-19);
  }
});