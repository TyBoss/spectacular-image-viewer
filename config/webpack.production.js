const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabiliPlugin = require("babili-webpack-plugin")

module.exports = {
  devtool: 'source-map',
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
    new ExtractTextPlugin('app.css'),
    new BabiliPlugin()
  ]
}
