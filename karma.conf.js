/* globals module:false */

module.exports = function(config) {
  'use strict';

  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      //'.tmp/css/style.css',
      'specs/**/*.js',
      //'.tmp/js/templates.js'
    ],

    // test results reporter to use
    // possible vals: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots'],

    // webserver port
    port: 9876,

    // enable / disable colors in output (logs and reporters)
    colors: true,

    // log level
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and exec tests when any file changes
    autoWatch: true,

    // Start these browsers, currently:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    // if browser does not capture in timeout [ms], kill it!
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it captures browsers, run tests and exit
    singleRun: false
  });
};
