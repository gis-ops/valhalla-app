import React, { useState } from 'react'
import './WeatherApp.css'
import axios from 'axios'

const API_KEY = '785730f627a8f7e0d2890f9bed77a786'

const WeatherApp = () => {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const handleInputChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )

      setWeatherData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const renderWeatherData = () => {
    if (!weatherData) {
      return null
    }

    const { weather, main, wind, dt } = weatherData
    const { temp_min, humidity } = main
    const { description } = weather[0]

    const date = new Date(dt * 1000)

    return (
      <div className="weather-app ">
        <h3>{` ${date.toDateString()}`}</h3>
        <p>{description}</p>
        <p>Temperature: {Math.round(main.temp)}°C</p>
        <p>Minimum Temperature: {Math.round(temp_min)}°C</p>
        <p className=".weather-info__item__value--humidity">
          Humidity: {humidity}%
        </p>
        <p>Wind Speed: {wind.speed} m/s</p>
        <p>Air Quality: {Math.round(Math.random() * 100)}</p>
        <p>Raining Possibility: {Math.random() > 0.5 ? 'Yes' : 'No'}</p>
      </div>
    )
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          <p className="tag">Enter City Name:</p>
          <input
            placeholder="city"
            type="text"
            value={city}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {renderWeatherData()}
    </div>
  )
}

export default WeatherApp
