// Karma configuration
// Generated on Sat Jun 06 2015 15:48:50 GMT+0800 (MYT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['qunit'],


    // list of files / patterns to load in the browser
    files: [
      {
        pattern: 'bower_components/fontawesome/fonts/*.*',
        served: true,
        included: false
      },
      {
        pattern: 'test/awesome-cursor-test-font/fonts/*.*',
        served: true,
        included: false
      },
      'bower_components/fontawesome/**/*.css',
      'test/awesome-cursor-test-font/style.css',
      { pattern: 'test/**/*.png', served: true, included: false },
      'bower_components/jquery/dist/jquery.js',
      'src/*.js',
      'test/*.js'
    ],

    proxies: {
      '/expected': 'http://localhost:9876/base/test/expected/'
    },


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],//, 'Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
