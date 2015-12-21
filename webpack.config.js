var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  debug: true, 
  entry: "./src/app",
  output: {
    path: __dirname + "/dist", publicPath: 'dist/', filename: "bundle.js" 
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [
        { test: /\.ts/, loaders: ['ts-loader'], exclude: /node_modules/}
    ]
  },
  
  devServer: {
    inline: true
  }
};