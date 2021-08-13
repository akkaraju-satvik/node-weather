const request = require('postman-request')

const weather = function(longitude, latitude, callback) {
    const url = `http://api.weatherstack.com/current?access_key=6737a2a88179992c95c627595efab87b&query=${latitude},${longitude}`
    request({url, json: true}, (err, { body }) => {
        if(err) {
            callback('Something went wrong! Could not connect to the weatherstack API', undefined)
        } else if(body.error) {
            callback(body.error.info, undefined)
        } else {
            const {current: data} = body
            callback(undefined, {temperature: data.temperature, feelslike: data.feelslike, precipitation: data.precip})
        }
    })
}

module.exports = weather
