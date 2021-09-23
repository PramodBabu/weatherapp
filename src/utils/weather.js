import axios from 'axios';

export const fetchWeatherByCity = async (city) => {
    return await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=286e09ccd1f43e2abe5b183292f38c00`
    );
}