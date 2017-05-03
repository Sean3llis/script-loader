var path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'script-loader.js',
    path: path.resolve(__dirname, 'build'),
    library: 'scriptLoader',
    libraryTarget: 'var'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [ ['es2015', { modules: false }], 'stage-0' ]
          }
        }],
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 9000,
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
