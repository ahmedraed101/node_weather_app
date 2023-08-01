const request = require('postman-request')
require('dotenv').config()

const { MAPBOX_ACCESS_TOKEN } = process.env

const geocode = (address, callback) => {
    const MapBoxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=1`
    request({ url: MapBoxURL, json: true }, (err, res, body) => {
        if (err) {
            callback('Unable to connect to location services', undefined)
        } else if (res.statusCode !== 200) {
            callback('response Error: ' + res.statusCode, undefined)
        } else if (res.body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            const [ longitude, latitude ] = res.body.features[0].center
            callback(undefined, {
                longitude, latitude,
                location: res.body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode

// request({ url: MapBoxURL, json: true }, (err, res, body) => {
//     if (err) {
//         console.error('unable to connect to MapBoxURL service', err.message)
//         return
//     } else if (res.statusCode !== 200) {
//         console.log(res)
//         return
//     } else if (res.body.features.length === 0) {
//         console.error(`can't find location MapBoxURL`)
//         return
//     }
//     const [longitude, latitude] = res.body.features[0].center
//     console.log(latitude, longitude)
// })
