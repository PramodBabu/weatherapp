import React, { useState } from 'react';
import { fetchWeatherByCity } from '../utils/weather';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../store/actionTypes';
import 'datejs';
import barChart from './charts/barChart';
import lineChart from './charts/lineChart';
import windMap from './charts/windMap';
import getMonth from '../utils/getMonth';

const Home = () => {

    const [city, setCity] = useState('');
    const [index, setIndex] = useState(0);
    const [tempState, setTempState] = useState('c')
    const dispatch = useDispatch();
    const {weather}  = useSelector(state => ({...state}))

    const groupDay = (data) => {
        let result = []
        for (var d in data) {
            let date = data[d]['dt_txt'].split(" ")[0];
            if (Object.keys(result).includes(date))
            {
                result[date].push(data[d])
            } 
            else{
                result[date] = []
                result[date].push(data[d])    
            }
        }
        return result;
    }

    const handleCitySubmit = () => {
        fetchWeatherByCity(city)
            .then(res => {
                const mod = res.data.city;
                const mod2 = groupDay(res.data.list);
                const combined = {mod, mod2};
                dispatch({
                    type: actionTypes.FETCH_WEATHER,
                    payload: {
                        cityWeather : combined
                    }
                });
            }).catch(err => {
                console.log(err);
            })
    }

    const getDayOfWeek = (date) => {
        const dayOfWeek = new Date(date).getDay();    
        return isNaN(dayOfWeek) ? null : 
          ['Sunday ', 'Monday ', 'Tuesday ', 'Wednesday ', 'Thursday ', 'Friday ', 'Saturday '][dayOfWeek];
    }

    const tempSwitch = (temp) => {
        if (tempState == 'c') return Math.floor(temp);
        if (tempState == 'f') return Math.floor((temp * 9/5) + 32);
    }
    

    return (
        <div className="container" style={{width: `800px`, paddingTop: `9rem`, backgroundColor: `white`, display: `flex`, flexDirection: `column`}}>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter City Name"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
            <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={handleCitySubmit}
            >Search</button>
            </div>
            { weather && <div className="container">
                    <div style={{display: `flex`, justifyContent: `space-between`}}>
                        <div style={{display: `flex`, alignItems: `center`}}>
                            <img src={`http://openweathermap.org/img/w/${Object.entries(weather.cityWeather.mod2)[index][1][0].weather[0].icon}.png`} alt="" style={{objectFit: `contain`, maxHeight: `100%`, width: `auto`}}/>
                            <h1 style={{paddingRight: `5px`}}>{tempSwitch(Object.entries(weather.cityWeather.mod2)[index][1][0].main.temp-273)}</h1>
                            <p onClick={() => setTempState('c')} style={{cursor: `pointer`, fontSize: `18px`}}>{'\u00b0'}C</p>
                            <pre> |</pre>
                            <p onClick={() => setTempState('f')} style={{cursor: `pointer`, fontSize: `18px`}}>{'\u00b0'}F</p>
                        </div>
                        <div style={{display: `flex`, flexDirection:`column`, alignItems: `end`}}>
                            <h2>{weather.cityWeather.mod.name}</h2>
                            <p style={{marginBottom: `0px`, fontSize: `20px`}}>
                                {getDayOfWeek(Object.entries(weather.cityWeather.mod2)[index][0])}
                                {getMonth(Object.entries(weather.cityWeather.mod2)[index][0])}
                            </p>
                            <p style={{marginBottom: `0px`, fontSize: `20px`}}>{Object.entries(weather.cityWeather.mod2)[index][1][0].weather[0].description}</p>
                        </div>
                    </div>
                    <div>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="temperature-tab" data-bs-toggle="tab" data-bs-target="#temperature" type="button" role="tab" aria-controls="temperature" aria-selected="true">Temperature</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="precipitation-tab" data-bs-toggle="tab" data-bs-target="#precipitation" type="button" role="tab" aria-controls="precipitation" aria-selected="false">Precipitation</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="wind-tab" data-bs-toggle="tab" data-bs-target="#wind" type="button" role="tab" aria-controls="wind" aria-selected="false">Wind</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent" style={{position:`relative`, height: `400px`}}>
                            <div className="tab-pane show active" id="temperature" role="tabpanel" aria-labelledby="temperature-tab">
                                <div>
                                    {lineChart(Object.entries(weather.cityWeather.mod2)[index][1], tempState)}
                                </div>
                            </div>
                            <div className="tab-pane" id="precipitation" role="tabpanel" aria-labelledby="precipitation-tab">
                                <div>
                                    {barChart(Object.entries(weather.cityWeather.mod2)[index][1])}
                                </div>
                            </div>
                            <div className="tab-pane" id="wind" role="tabpanel" aria-labelledby="wind-tab">
                                {windMap(Object.entries(weather.cityWeather.mod2)[index][1])}
                            </div>
                        </div>
                    </div>
                    <div style={{display: `flex`, justifyContent: `space-evenly`}}>
                        {
                            Object.entries(weather.cityWeather.mod2).map( (item,i) => (
                                <div className="card border-light" style={{width: `10rem`}} onClick={() => setIndex(i)}>
                                    <div className="card-body" style={{padding: `5px`}}>
                                        <h5 className="card-title">{getDayOfWeek(item[0])}</h5>
                                        <img src={`http://openweathermap.org/img/w/${item[1][0].weather[0].icon}.png`} alt=""/>
                                        <div style={{display: `flex`, justifyContent:`center`, alignItems: `center`}}>
                                            <p className="card-text" style={{fontWeight: `bold`, fontSize: `19px`}}>{Math.floor(item[1][0].main.temp_max-273)}{'\u00b0'}</p>
                                            <pre> </pre>
                                            <p>{Math.floor(item[1][0].main.temp_min-273)}{'\u00b0'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            </div>
            }
        </div>
    );
}

export default Home;