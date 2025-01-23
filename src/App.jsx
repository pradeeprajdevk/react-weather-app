import { useEffect, useState } from 'react';
import './App.css';

/* Images */
import searchIcon from "./assets/Search.png";
import clearIcon from "./assets/Clear.png";
import cloudIcon from "./assets/Cloud.png";
import drizzleIcon from "./assets/Drizzle.png";
import humidityIcon from "./assets/Humidity.png";
import rainIcon from "./assets/Rain.png";
import snowIcon from "./assets/Snow.png";
import windIcon from "./assets/Wind.png";
import mistIcon from "./assets/Mist.png";
import thunderIcon from "./assets/Thunder.png";
import { WeatherDetails } from './components/WeatherDetails';

function App() {

  let apiKey = '<API_KEY>';
  const [text, setText] = useState('Chennai');

  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);

  /* Loading */
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "11d": thunderIcon,
    "11n": thunderIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "50d": mistIcon,
    "50n": mistIcon
  }


  const search = async() => {    
    setLoading(true); 

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();

      if (data.cod == '404') {
        console.log("City not found");
        setLoading(false);
        setCityNotFound(true);        
        return;
      }

      setError(null);
      setHumidity(data.main.humidity);
      setTemp(Math.floor(data.main.temp));
      setWind(data.wind.speed);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      
      setCity(data.name);
      setCountry(data.sys.country);

      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    } catch(err) {
      console.log("An error occurred:", err);
      setError("An error occurred while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  }

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className='cityInput' 
            placeholder='Search City' onChange={handleCity} value={text}
            onKeyDown={handleKeyDown}/>
          <div className="search-icon" onClick={() => search()}>
            <img src={searchIcon} alt="Search" />
          </div>
        </div>
        
        { loading && <div className='loading-message'>Loading...</div>}

        { error && <div className='error-message'>{error}</div> }

        { cityNotFound && <div className="city-not-found">City Not Found.</div> }

        {!loading && !cityNotFound && <WeatherDetails 
          icon={icon} temp={temp} city={city} country={country}
          lat={lat} log={log} humidityIcon={humidityIcon} windIcon={windIcon} 
          humidity={humidity} wind={wind}
        /> }

        <p className='copyright'>
          Designed by <span>Pradeep Raj</span>
        </p>
      </div>
    </>
  )
}

export default App
