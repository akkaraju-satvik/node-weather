const express = require('express');
const path = require('path');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');
const hbs = require('hbs');



const app = express();
const port = process.env.PORT || 3000;

// Setting up path to the respective directories

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup HBS, and Views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static assets directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Satvik'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) return res.send({error: "Please provide location!"})

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) return res.send({error: error})

        weather(longitude, latitude, (error, {temperature, feelslike} = {}) => {
            if(error) return res.send({error: error})   
            res.send({temperature, feelslike, location})
        })
    })


})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About', name: 'Joe', src: '../img/Portrait.jpg'})
})

app.get('/help/', (req, res) => {
    res.render('help', {title: 'Help', name: 'Mama'})
    // res.send({forecast: `It's clear`, location: 'Hyderabad, India'})
})

app.get('/help/*', (req, res) => {
    res.render('404', {title:'404 Page Not Found', error: 'Help article not found'});
})

app.get('*', (req, res) => {
    res.render('404', {title: '404 Page Not Found', error: 'Page Not Found'})
})

app.listen(port, () => {console.log(`listening on port ${port}`)});