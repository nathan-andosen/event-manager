var webpack = require("webpack");
var path = require('path');
var version = require('./package.json').version;
var isProduction = (process.env.NODE_ENV === 'production');

var banner = 'EventManager v' + version + '\n' +
  '(c) ' + new Date().getFullYear() + ' Nathan Anderson';

module.exports = {
  mode: (isProduction) ? "production" : "development",
  entry: {
    "EventManager" : "./src/index.ts"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "event-manager.min.js",
    library : ["EventManager"],
    libraryTarget: 'umd'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.ts(x?)$/, loader: 'ts-loader', exclude: /node_modules/ }
    ]
  }
};


if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.BannerPlugin(banner),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}
