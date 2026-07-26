function WeatherCard({weather, city}) {
    const formattedTime = new Date(weather.current_weather.time).toLocaleString();
    const {temperature, windspeed, winddirection, time, code} = weather.current_weather;
    return (
        <div>
            <h2>Données météo pour {city}</h2>
            <p>Température : {temperature}°C</p>
            <p>Vitesse du vent : {windspeed} km/h</p>
            <p>Direction du vent : {winddirection}°</p>
            <p>Heure de la mesure : {formattedTime}</p>
            <p>Code météo : {code}</p>
        </div>
    );
}



export default WeatherCard;