var path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/script-loader.js',
  output: {
    filename: 'script-loader.js',
    path: path.resolve(__dirname, 'build'),
    library: 'scriptLoader',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [ 'es2015', 'stage-0' ]
          }
        }],
      },
    ]
  }
};
