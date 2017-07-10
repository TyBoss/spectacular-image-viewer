const express = require('express')
const app = express()
const path = require('path')
const pug = require('pug')

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => res.render('index'))

app.listen(9001, () => console.log('App is running at 9001!!!!'))

