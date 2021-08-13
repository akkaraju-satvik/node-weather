// console.log('Running', document.title)

const weatherForm = document.querySelector('form')
const locationInput = document.querySelector('input')
const errorELement = document.querySelector('#error')
const temperatureElement = document.querySelector('#temperature')
const feelslikeElement = document.querySelector('#feelslike')
const locationElement = document.querySelector('#location')
const precipitationElement = document.querySelector('#precipitation')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    errorELement.textContent = 'Loading weather...'
    locationElement.textContent = ''
    temperatureElement.textContent = ''
    feelslikeElement.textContent = ''
    precipitationElement.textContent = ''
    fetch(`/weather?address=${encodeURIComponent(locationInput.value)}`).then(response => {
        response.json().then(dataJSON => {
            if(dataJSON.error) {    
                errorELement.textContent = dataJSON.error
            } else {
                errorELement.textContent = ''
                temperatureElement.textContent = `${dataJSON.temperature}°C`
                feelslikeElement.textContent = `Feels like ${dataJSON.feelslike}°C`
                locationElement.textContent = `${dataJSON.location}`
                precipitationElement.textContent = `Current precipitation is ${dataJSON.precipitation}mm`
            }
        })
    })

    locationInput.value = '';
})


