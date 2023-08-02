const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('dotenv').config()
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const PORT = process.env.PORT || 5000

// define paths for Express config
const publicDirPath = path.join(__dirname, '../', 'public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialaPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialaPath)

// setup static dir to serve static files
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', { title: 'Weather App', name: 'Ahmed Raed' })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        info: 'in this page you will find how I can help you with if face any problems.',
        name: 'Ahmed Raed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page', name: 'Ahmed Raed' })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'you must provide an address'})
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecaseData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecaseData,
                address: req.query.address,
                location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:' you must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {title: '404', name: "Ahmed Raed", errorMessage: "Help article not found"})
})

app.get("*", (req, res) => {
    res.render('404', {title: '404', name: "Ahmed Raed", errorMessage: "Page Not Found"})
})

app.listen(PORT, () => console.log(`live on PORT: ${PORT}`))
