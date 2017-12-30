const path = require('path');

const pkg = require('./package');

module.exports = {
  entry: {
    page: path.resolve(__dirname, 'page'),
    [pkg.name]: path.resolve(__dirname, 'monitor')
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
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json',
        exclude: /node_modules/
      }
    ]
  }
};
