'use strict';

var App = require('./app'),
    _app;

_app = new App();

$(function init(){
  _app.getLocation();
});