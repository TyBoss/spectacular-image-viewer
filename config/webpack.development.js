const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: [
    './src/app.js',
    './src/app.css',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:9010'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/dist'
  },
  module: {
    loaders: [
      { test: /\.pug$/,  loader: "pug-loader" },
      { test: /\.css$/, loaders: ExtractTextPlugin.extract('css-loader') }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src/views/index.pug'),
      inject: 'body'
    }),
    new CopyWebpackPlugin([{
      context: '../src/assets',
      from: '**.*',
      to: 'assets'
    },
    {
      context: path.resolve(__dirname, '..', 'src'),
      from: 'app.css',
      to: '.'
    }]),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('app.css')
  ]
}
