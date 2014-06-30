'use strict';

module.exports = {
  mapId: 'slickaslicka.ijln098d',
  apiEndpoint: (document.location.hostname != 'localhost') ? '//api.alucic.com/markets' : '//localhost:3000/markets',
  locationEndpoint: (document.location.hostname != 'localhost') ? '//api.alucic.com/location' : '//localhost:3000/location'
};