var helpers = require('./helpers');
// Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin  = require('webpack/lib/DefinePlugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/*
 * Config, more: http://webpack.github.io/docs/configuration.html
 */
module.exports = helpers.defaults({
    // Choose a developer tool to enhance debugging.
    devtool: 'inline-source-map', //  A SourceMap is added as DataUrl to the JavaScript file

    // Options affecting the normal modules (NormalModuleFactory)
    module: {
        // An array of applied preloaders
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: [
                    helpers.root('node_modules')
                ]
            },
            {
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: [
                    helpers.root('node_modules/rxjs')
                ]
            }
        ],

        // An array of automatically applied loaders
        // Each item can have these properties:
        //
        // test: A condition that must be met
        // exclude: A condition that must not be met
        // include: A condition that must be met
        // loader: A string of “!” separated loaders
        // loaders: An array of loaders as string
        // @see http://webpack.github.io/docs/loaders.html
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                query: {
                    "compilerOptions": {
                        "noEmitHelpers": true,
                        "removeComments": true,
                    }
                },
                exclude: [ /\.e2e\.ts$/ ]
            },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.css$/,  loader: 'raw-loader' }
        ],

        // An array of applied postloaders
        postLoaders: [
            // instrument only testing sources with Istanbul
            {
                test: /\.(js|ts)$/,
                include: helpers.root('src'),
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    /node_modules/
                ]
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            // Environment helpers
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'NODE_ENV': JSON.stringify(ENV)
            }
        }),
        new ProvidePlugin({
            // TypeScript helpers
            '__metadata': 'ts-helper/metadata',
            '__decorate': 'ts-helper/decorate',
            '__awaiter': 'ts-helper/awaiter',
            '__extends': 'ts-helper/extends',
            '__param': 'ts-helper/param',
        })
    ],
    stats: { colors: true, reasons: true }
});

