'use strict';

var App = require('./app'),
    _app;

_app = global.app = module.exports = new App();

$(function init() {
  // _app.getLocation();

  _app.renderMap(_app.defaults.mapID);

  //TODO: Add back in getting location, add controls for opening filter screen, add function to rerender the map points
});