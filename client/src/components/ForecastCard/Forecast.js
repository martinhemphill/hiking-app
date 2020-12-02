import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';

const Forecast = () => {

    let [longitude, setLongitude] = useState('');
    let [latitude, setLatitude] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState([])
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    function getForecast(e) {
        e.preventDefault();
     
        // Clear state in preparation for new data
        setError(false);
        setResponseObj(null);       
        setLoading(true);
       
        
     
        fetch(`api.openweathermap.org/data/2.5/forecast?units=${unit}&lat=${latitude}&lon=${longitude}&appid={8337c9967573e14ada129e51effa9dea}`, {
            "method": "GET",
            
        })
        .then(response => response.json())
        .then(data => {            
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"))            
            setResponseObj(dailyData);
            setLoading(false);
          })
        
        .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err.message);
        });
     }
    

   return (
    <div>
        <h2>Find Current Weather Conditions</h2>
        <p>Raleigh Lat: 35.787743 Long: -78.644257</p>
            
        <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter Longitude"
                    maxLength="50"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className={classes.textInput}
                    />
                <input
                    type="text"
                    placeholder="Enter Latitude"
                    maxLength="50"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className={classes.textInput}
                    />
                <label>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        className={classes.Radio}
                        />
                    Fahrenheit
                </label>
                <label>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        className={classes.Radio}
                        />
                    Celcius
                </label>
                <button type="submit" className={classes.Button} >Get Forecast</button>
            </form>

            {responseObj && <Conditions
              responseObj={responseObj}
              error={error} //new
              loading={loading} //new
              />}
    </div>
   )
}

export default blank;