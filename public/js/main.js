console.log("Client side JS loaded...")

const form = document.querySelector('form')
const input = document.querySelector('input')

var tempElement = document.querySelector('#temp')
var feelslikeElement = document.querySelector('#feelslike')
var summaryElement = document.querySelector('#summary')
var conentElement = document.querySelector('.content')

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    const location = input.value
    fetch('/getweather?address='+location).then(resp=>{
        resp.json().then(({temperature, weather_icons, weather_descriptions, feelslike})=>{
            tempElement.textContent = "Temperature: "+temperature
            feelslikeElement.textContent = "Feels Like: "+feelslike
            summaryElement.textContent = "Summary: "+(weather_descriptions.length?weather_descriptions.join(','):"N/A")
            
            var img=conentElement.querySelector('#icon')
            if (img)
                img.remove()
            
            if (weather_icons.length)
                var img = new Image()
                img.src = weather_icons[0]
                img.id = "icon"
                conentElement.appendChild(img)
        })
    })
})
