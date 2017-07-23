const path = require('path')
const configuration = require(`./webpack.${process.env.NODE_ENV || 'development'}`)
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseConfig = {
  entry: './src/app.js',
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
  }
}

module.exports = Object.assign(baseConfig, configuration)
