const express = require('express')
const path = require('path');
const hbs = require('hbs')
const app = express()
const webRequest = require('./utils')
let defaultCity = "philadelphia,PA"


app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, resp) => {
    return resp.render('index', {
        title: "Weather App",
        description: "The weather application using express.js and node.js",
        name: "Ryan Wilk"
    })
})

app.get('/help', (req, resp) => {
    // return resp.sendFile(path.join(__dirname,'../public/help.html'))
    return resp.render('help', {
        title: "Help",
        description: "Ah, there it is... good ol' bikini bottom",
        name: "Ryan"
    })
})

app.get('/getweather', (req, resp) => {
    if (!req.query.address) {
        req.query.address = defaultCity
    }

    webRequest.getGeo(req.query.address, (err, geoResp) => {
        if (!err) {
            webRequest.getWeather(geoResp, (err, weatherResp) => {
                resp.send(weatherResp)
            })
        } else
            return resp.send(err)
    })
})

app.get('/weather', (req, resp) => {
    return resp.render('weather', {
        title: "Weather",
        name: "Ryan"
    })
})

app.get("/help/*", (req, resp) => {
    return resp.render('404', {
        title: "Help",
        error: "The help page you're looking for cannot be found",
        name: "Ryan"
    })
})

app.get("/weather/*", (req, resp) => {
    resp.render('404', {
        title: "Weather",
        error: "The weather page you're looking for cannot be found",
        name: "Ryan"
    })
})

app.get("*", (req, resp) => {
    return resp.render('404', {
        title: "404",
        error: "The page you're looking for cannot be found",
        name: "Ryan"
    })
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})