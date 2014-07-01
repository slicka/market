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
        'products': attributes.products,
        'daysopen': attributes.daysopen,
        'borough': attributes.borough,
        'ebt': attributes.ebt,
        'textile': attributes.textile,
        'compost': attributes.compost,
        'battery': attributes.battery,
        'name': attributes.name,
        'description': attributes.description,
        'yearround': attributes.yearround,
        'timesopen': attributes.timesopen,
        'dateopen': attributes.dateopen,
        'dateclose': attributes.dateclose,
        'street': attributes.street,
        'url': attributes.url,
        'product_days': attributes.product_days,
        'farmer_days': attributes.farmer_days,
        'marker-size': 'medium',
        'marker-color': '#e5938e',
      }
    }));
  }
});