function WeatherCard({weather, city}) {
    const {temperature, windspeed, winddirection, time} = weather.current_weather;
    return (
        <div>
            <h2>Données météo pour {city}</h2>
            <p>Température : {temperature}°C</p>
            <p>Vitesse du vent : {windspeed} km/h</p>
            <p>Direction du vent : {winddirection}°</p>
            <p>Heure de la mesure : {time}</p>
        </div>
    );
}

export default WeatherCard;