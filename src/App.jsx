import {useState} from 'react'
import { getWeather } from './services/weatherApi';
import {weatherData} from './services/weatherApi';
import WeatherCard from './components/WeatherCard';
import { useState, useEffect } from "react";


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
   async function loadDefaultWeather() {
    const weatherData = await getWeather("lomé");
    setWeather(weatherData);
   }

   loadDefaultWeather();
  }, []);

  async function handleSearch() {
    // Logique de recherche de la ville
    console.log(`Recherche de la ville : ${city}`);
    setLoading(true);
    try {
      const weatherData = await getWeather(city);
      setWeather(weatherData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo :', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
    setCity(''); // Réinitialiser le champ de saisie après la recherche
  }



  const {temperature, windspeed, winddirection} = weather.current_weather;
  return(
    <div>
      <h1>Weather App</h1>
      <p>rechercher une ville </p>
      <input 
        type="text" 
        placeholder="Entrez le nom de la ville" 
        value={city}
        onChange={(e) => setCity(e.target.value)}
      /> 
      <button onClick={handleSearch}>rechercher</button>   
      <p>Vous recherchez : {city}</p>
    </div>
    );
    
    {loading && <p>Chargement...</p>}
    {weather && (
      <weatherCard weather={weather} city={city} />
    )}
    {error && <p>Erreur : {error}</p>}
  }

export default App;