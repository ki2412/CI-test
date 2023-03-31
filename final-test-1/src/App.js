import React, { useState } from 'react';
import './App.css';

function App() {
  
  const [data,setData] = useState({})
  const [city,setCity] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0f512246023a76b37196e6cc1c5da287`
  
  const searchCity = (event) => {
    if (event.key === 'Enter') {
      fetch(url)
        .then(res => res.json())
        .then((data) => {
          setData(data)
          setCity('')
          console.log(data)
        })
    }
}

  return (
    <div className='app'>
      <div className='search'>
        <input 
          type='text' 
          placeholder='Search city name'
          value={city}
          onChange={event => setCity(event.target.value)}
          onKeyDown = {searchCity}
        />
      </div>

      <div className='container'>

        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : <h1>Not found</h1>}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className='bottom'>
            <div className='feels'>
              <p className='bold'>{data.main.feels_like.toFixed()}°C</p>
              <p>Feels like</p>
            </div>
            <div className='humidity'>
              <p className='bold'>{data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className='wind'>
              <p className='bold'>{data.wind.speed}MPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        }

      </div>
    </div>
  )

}

export default App
