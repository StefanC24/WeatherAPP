import './App.css'
import {useEffect, useState} from 'react'

function App() {
  const [cityInput, setCity] = useState("Atherstone")
  let city
  const apiUrl = `https://api.weatherbit.io/v2.0/current?`
  const apiKey = "adfed9b5d49f454da5c0d1660059c55d"
  const [data, setData] = useState(null)
  const [weather, setWeather] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [sunrise, setSunrise] = useState(null)
  const [sunset, setSunset] = useState(null)
  const [windDirection, setWindDirection] = useState(null)
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
        setWeather(result.data[0].weather.description)
        setTemperature(result.data[0].temp)
        setSunrise(result.data[0].sunrise)
        setSunset(result.data[0].sunset)
        setWindDirection(result.data[0].wind_cdir_full)
      })
      .catch((error)=> console.error(`Error fetching data:`, error))
      };
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
      <div className="cityName">{data}</div>
      <div className='results'>
        <div className='temperature_icon'>
          <img className='icon_weather' src={process.env.PUBLIC_URL + '/icons/moon_stars.png'}></img>
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
