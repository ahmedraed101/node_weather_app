const request = require('postman-request')
require('dotenv').config()

const { WEATHER_STACK_ACCESS_TOKEN } = process.env

const forecast = (longitude, latitude, callback) => {
    const WeatherStackURL = `http://api.weatherstack.com/current?access_key=${WEATHER_STACK_ACCESS_TOKEN}&query=${latitude}, ${longitude}`
    request({ url: WeatherStackURL, json: true }, (err, res, body) => {
        if (err) {
            callback('Unable to connect to Weather service', undefined)
        } else if (res.statusCode !== 200) {
            callback(`response error: ${res.statusCode}`, undefined)
        } else if (res.body.error) {
            callback('unable for find location of WeatherStack', undefined)
        } else {
            const { location, current } = res.body
            const { region, name, country } = location
            const { weather_descriptions, temperature, feelslike } = current

            callback(
                undefined,
                `the Weather in ${region} - ${name} - ${country} is ${weather_descriptions.join(' ')} Temperature: ${temperature} / Feels like: ${feelslike}`
            )
        }
    })
}

module.exports = forecast

// request({ url: WeatherStackURL, json: true }, (err, res, body) => {
//     if (err) {
//         console.error(err.message)
//         return
//     } else if (res.statusCode !== 200) {
//         console.error('error', res.statusCode)
//     } else if (res.body.error) {
//         console.error('unable for find location of WeatherStack')
//     }
//     const location = res.body.location
//     console.log(
//         `
//         the Weather in ${location.region} - ${location.name} - ${
//             location.country
//         }
//         is ${res.body.current.weather_descriptions.join(' ')}
//         Temperature: ${res.body.current.temperature} / Feels like: ${
//             res.body.current.feelslike
//         }
//         `
//     )
// })
