'use strict';

module.exports = Market;

function Market(attributes){
  _.extend(this, attributes);
}

_.extend(Market, {
  formatGeoJSON: function formatGeoJSON(attributes) {
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
        'daysopen'    : attributes.daysopen,
        'products'    : attributes.products,
        'dateclose'   : attributes.dateclose,
        'timesopen'   : attributes.timesopen,
        'yearround'   : attributes.yearround,
        'description' : attributes.description,
        'farmer_days' : attributes.farmer_days,
        'marker-size' : 'medium',
        'marker-color': '#e5938e',
        'product_days': attributes.product_days,
      }
    }));
  }
});