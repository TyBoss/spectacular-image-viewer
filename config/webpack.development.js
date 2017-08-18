const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: [
    './src/app.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:9010'
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src/views/index.pug'),
      inject: 'body'
    }),
    new CopyWebpackPlugin([{
      context: path.resolve(__dirname, '../', 'src/assets'),
      from: '**.*',
      to: 'assets'
    }]),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('app.css')
  ]
}
