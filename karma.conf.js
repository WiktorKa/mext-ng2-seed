// https://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = function(config) {
    var testWebpackConfig = require('./webpack.test.config.js');

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // base path that will be used to resolve all patterns (e.g. files, exclude)
        basePath: '',

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            //'Chrome',
            'PhantomJS'
        ],

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // list of files/patterns to exclude from loaded files.
        exclude: [ ],

        // list of files / patterns to load in the browser
        // we are building the test environment in ./spec-bundle.js
        files: [ { pattern: 'spec-bundle.js', watched: false } ],

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // web server port
        port: 9876,

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: { 'spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [ 'mocha', 'coverage' ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Webpack configuration
        webpack: testWebpackConfig,
        webpackServer: { noInfo: true }, // Webpack please don't spam the console when running in karma!

        // coverageReporter configuration
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {type: 'text-summary'},
                {type: 'json'}/*,
                {type: 'html'}*/
            ]
        }
    });
}