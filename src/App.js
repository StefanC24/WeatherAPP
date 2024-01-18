import './App.css'
import {useState} from 'react'

function App() {
  const [cityInput, setCity] = useState("Atherstone")
  let city
  const apiUrl = `https://api.weatherbit.io/v2.0/current?`
  const apiKey = "adfed9b5d49f454da5c0d1660059c55d"
  const [data, setData] = useState(null)
  const [countryCode, setCountryCode] = useState(null)
  const [weather, setWeather] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [sunrise, setSunrise] = useState(null)
  const [sunset, setSunset] = useState(null)
  const [windDirection, setWindDirection] = useState(null)

  const weatherIcons = {
    "Thunderstorm with light rain" : "Thunderstorm with rain.png",
    "Thunderstorm with rain" : "Thunderstorm with rain.png",
    "Thunderstorm with heavy rain.png" : "Thunderstorm with rain.png",
    "Thunderstorm with light drizzle" : "Thunderstorm with light drizzle.png",
    "Thunderstorm with drizzle" : "Thunderstorm with light drizzle.png",
    "Thunderstorm with heavy drizzle" : "Thunderstorm with light drizzle.png",
    "Thunderstorm with Hail" : "Thunderstorm with light drizzle.png",
    "Light Drizzle" : "Light Drizzle.png",
    "Drizzle" : "Light Drizzle.png",
    "Heavy Drizzle" : "Light Drizzle.png",
    "Light Rain" : "Light Rain.png",
    "Moderate Rain" : "Light Rain.png",
    "Heavy Rain" : "Heavy Rain.png",
    "Freezing rain" : "Light Rain.png",
    "Light shower rain" : "Light Rain.png",
    "Shower rain" : "Shower rain.png",
    "Heavy shower rain" : "Light Rain.png",
    "Light snow" : "Light snow.png",
    "Snow" : "Snow.png",
    "Heavy Snow" : "Snow.png",
    "Mix snow/rain" : "Light snow.png",
    "Sleet" : "Sleet.png",
    "Heavy sleet" : "Sleet.png",
    "Snow shower" : "Light snow.png",
    "Heavy snow shower" : "Snow.png",
    "Flurries" : "Flurries.png",
    "Mist" : "Mist.png",
    "Haze" : "Mist.png",
    "Sand/dust" : "Mist.png",
    "Fog" : "Mist.png",
    "Freezing Fog" : "Mist.png",
    "Smoke" : "Mist.png",
    "Clear sky" : "Clear sky.png",
    "Few clouds" : "Few clouds.png",
    "Scattered clouds" : "Scattered clouds.png",
    "Broken clouds" : "Broken clouds.png",
    "Overcast clouds" : "Overcast clouds.png",
    "Unknown Precipitation" : "Unknown Precipitation.png"
  }

  const handleInputValue = (e) =>{
    setCity(e.target.value)
  }

  const changeValue = () => {
    city = cityInput
    console.log(city)
    
    const fetchData = () => {
      fetch(`${apiUrl}city=${city}&key=${apiKey}`)
      .then((response) => {
        // console.log(response); // Log the entire response
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) =>{
        console.log(result)
        setData(result.data[0].city_name)
        setCountryCode(result.data[0].country_code)
        setWeather(result.data[0].weather.description)
        setTemperature(result.data[0].temp)
        setSunrise(result.data[0].sunrise)
        setSunset(result.data[0].sunset)
        setWindDirection(result.data[0].wind_cdir_full)
      })
      .catch((error)=> console.error(`Error fetching data:`, error))
      };

      console.log(weatherIcons[weather])

      if (weather in weatherIcons){
        document.getElementById("icon_weather").src = `${process.env.PUBLIC_URL}/icons/${weatherIcons[weather]}`
      }

      fetchData()
      setData("")
    }
    

  return (
    <div className='app'>
      <p className='intro'>Welcome to WeatherApp</p>
      <div className='search'>
        <input className="cityInput" type="text" placeholder="Enter city" onChange={handleInputValue}></input>
        <button title='search button' type='button' className='search_button' onClick={changeValue}></button>
      </div>
      <div className="cityName">{data}, {countryCode}</div>
      <div className='results'>
        <div className='temperature_icon'>
          <img className='icon_weather' id="icon_weather"></img>
          <div className='weather_info'>
            <p className="temperature">{temperature}°</p>
            <p className="weather">{weather}</p>
          </div>
        </div> 
        <div className='wind_direction'>
          <img className='wind_icon' src={process.env.PUBLIC_URL + '/icons/wind-direction.png'}></img>
          <div className="wind">Wind Direction: <bold>{windDirection}</bold></div>
        </div>
        <div className='sunrise_div'>
          <img className='sunrise_icon' src={process.env.PUBLIC_URL + '/icons/sunrise.png'}></img>
          <div className="sunrise">Sunrise at {sunrise}</div>
        </div>
        <div className='sunset_div'>
          <img className='sunset_icon' src={process.env.PUBLIC_URL + '/icons/sunset.png'}></img>
          <div className="sunset">Sunset at {sunset}</div>
        </div>

      </div>    
    </div>
  );
}

export default App;