const express = require('express')
const app = express()
const path = require('path')
const pug = require('pug')
const Flickr = require('flickrapi')
const { flickrParser } = require('./libs/image-parsers')
const favicon = require('serve-favicon')

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

app.set('view engine', 'pug')
app.set('views', './views')
app.use('/static', express.static('dist'))
app.get('/', (req, res) => res.render('index'))
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
app.set('port', PORT);

app.listen(PORT, () => console.log(`App is running at ${PORT}!!!!`))

