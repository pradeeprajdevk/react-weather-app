
import PropTypes from "prop-types";

export const WeatherDetails = ({ icon, temp, city, country, lat, log, humidityIcon, windIcon, humidity, wind }) => {
  return (
    <>
      <div className='image'>
        <img src={icon} alt="Image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="Humidity"  className='icon'/>
          <div className="data">
            <div className="humidity-percent">
              {humidity}%
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={windIcon} alt="Wind"  className='icon'/>
          <div className="data">
            <div className="wind-percent">
              {wind} km/h
            </div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  )
}

WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
  humidityIcon: PropTypes.string.isRequired,
  windIcon: PropTypes.string.isRequired,
};