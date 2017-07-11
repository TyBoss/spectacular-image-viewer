const express = require('express')
const app = express()
const path = require('path')
const pug = require('pug')
const Flickr = require('flickrapi')
const { flickrParser } = require('./libs/image-parsers')

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

app.get('/images', async (req, res, next) => {
  const flickrApi = await authenticate(flickrOptions)
  const search = promisify(flickrApi.photos.search)

  const results = await search({ text: 'sharingan' })
  res.json(flickrParser(results.photos.photo))
  return
})

app.listen(9001, () => console.log('App is running at 9001!!!!'))

