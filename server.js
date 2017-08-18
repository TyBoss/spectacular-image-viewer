const express = require('express')
const path = require('path')
const Flickr = require('flickrapi')
const { flickrParser } = require('./libs/image-parsers')
const favicon = require('serve-favicon')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const proxy = require('proxy-middleware')

const ENV = process.env.NODE_ENV || 'development'

const webPackConfig = require('./config')

const app = express()

const { promisify } = require('util')

const authenticate = promisify(Flickr.tokenOnly)

const flickrOptions = {
  api_key: process.env.FLICKR_KEY,
  secret: process.env.FLICKR_SECRET,
  nobrowser: true,
  silent: true,
  noAPI: false,
  progress: false
}

app.set('view engine', require('ejs').renderFile)
app.set('views', './src/views')
app.use('/dist', express.static('dist'))
app.get('/', (req, res) => res.sendFile('index.html', { root: './dist' }))
app.use(favicon(__dirname + '/dist/assets/favicon.ico'))

const fetchImages = async (text) => {
   const flickrApi = await authenticate(flickrOptions)
   const search = promisify(flickrApi.photos.search)

   const results = await search({ text })
   return flickrParser(results.photos.photo)
}

app.get('/images', async (req, res, next) => {
  try {
    const results = await fetchImages('sharingan')
    res.json(results)
  } catch(ex) {
    res.send(500, ex)
  }
  return
})

app.get('/images/:image', async ({ params: { image: text } }, res, next) => {
  try {
     const results = await fetchImages(text)
     res.json(results)
  } catch (ex) {
    res.send(500, ex)
  }
  return
})

const PORT = process.env.PORT || 9001

if (ENV === 'development') {
  const devServer = new WebpackDevServer(webpack(webPackConfig), {
    hot: true,
    stats: { colors: true },
    contentBase: "dist/"
  })

  devServer.use('/images', proxy(`http://localhost:${PORT}/images`))
  devServer.use('/dist', proxy(`http://localhost:${PORT}/dist`))
  devServer.listen(9010, console.log('Hot live reload action at 9010!'))
}

app.set('port', PORT);
app.listen(PORT, () => console.log(`App is running at ${PORT}!!!!`))
