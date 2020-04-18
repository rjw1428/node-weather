const request = require('request')
const weatherStackApiKey = "1e878cd067c4700eafb9e09fbd159232"
const mapboxToken = "pk.eyJ1Ijoicmp3MTQyOCIsImEiOiJjazk1OWY2N3cwOGljM2xxdjZpMWFzN2Y1In0.4A4sJclz7WQNVO0AY1IFbg"


const getGeo = (city, callback) => {
    const geo = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(city)+".json?access_token="+mapboxToken+"&limit=1"
    request({ url: geo, json: true}, (err, {body}) =>{
        try {
            if (err || body.error) callback(err, undefined)
            const data = body.features[0]
            callback(undefined, data.center.reverse())
        } catch (err) {
            callback(err, undefined)
        }
    })
}

const getWeather = (coord, callback) =>{
    let weather = "http://api.weatherstack.com/current?access_key="+weatherStackApiKey+"&query="+coord.join(",")+"&units=f"
    request({ url: weather, json: true}, (err, {body}) =>{
        try {
            if (err || body.error) callback(err, undefined)
            const data = body.current
            callback(undefined, data)
        } catch (err) {
            callback(err, undefined)
        }
    })
}

module.exports = {
    getWeather: getWeather,
    getGeo: getGeo
}