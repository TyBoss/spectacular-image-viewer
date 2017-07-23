const path = require('path')
const configuration = require(`./webpack.${process.env.NODE_ENV || 'development'}`)

const baseConfig = {}
module.exports = Object.assign(baseConfig, configuration)
