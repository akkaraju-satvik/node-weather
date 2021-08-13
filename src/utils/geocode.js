const request = require('postman-request')

const geocode = function(address, callback) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWtrYXJhanVzYXR2aWsiLCJhIjoiY2tyenVyeDJsMDZvNTMxbzNwbm00d2NlcyJ9.JvPnxOGWryl5vCvIUBDESQ&limit=1`
    request({url, json: true}, function(err, response) {
        if(err) {
            callback('Something went wrong! Could not connect to the geocoding API', undefined)
        } else if(response.body.features.length === 0) {
            callback("Unable to find the location", undefined)
        } else {
            const [longitude, latitude] = response.body.features[0].center
            callback(undefined, {longitude, latitude, location: response.body.features[0].place_name})
        }
    })
}

module.exports = geocode