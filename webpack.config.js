'use strict';

const path = require('path');

module.exports = {
  entry: {
    page: path.resolve(__dirname, 'page'),
    monitor: path.resolve(__dirname, 'monitor')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build',
    filename: '[name].js',
    library: 'monitor',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto',
        exclude: /node_modules/
      }
    ]
  }
};
