
import { getWeather } from './services/weatherApi';
import WeatherCard from './components/WeatherCard';
import { useState, useEffect } from "react";
import SearchHistory from './components/SearchHistory';


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayCity, setDisplayCity] = useState(''); // État pour stocker la ville affichée
  const [searchHistory, setSearchHistory] = useState([]); // État pour stocker l'historique des recherches


  useEffect(() => {
    loadWeather("Lomé"); // Charger les données météo pour Paris au démarrage de l'application
  }, []);



  async function loadWeather(cityName) {

    setLoading(true);

    try {
      const weatherData = await getWeather(cityName);
      setWeather(weatherData);
      setDisplayCity(cityName);

      setSearchHistory((prev) => {
        if (prev.includes(cityName)) {
          return prev;
        }
        return [...prev, cityName];
      });

      setError(null); // Réinitialiser l'erreur si la récupération est réussie
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

    async function handleSearch(e) {

      if (!city.trim()) {
        return;
      }

    e.preventDefault(); // Empêcher le rechargement de la page  
    // Logique de recherche de la ville

    await loadWeather(city); // Charger les données météo pour la ville recherchée          

    setCity(''); // Réinitialiser le champ de saisie après la recherche
  }

  function handleHistoryClick(city) {
    loadWeather(city);
}




  return (
    <div>
      <h1>Weather App</h1>
      <p>rechercher une ville </p>
 
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Entrez le nom de la ville" 
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button 
        type="submit"
        disabled={loading || !city.trim()}
        >
          Rechercher</button>
      </form>     
    
    
      {loading && <p>Chargement...</p>}
      {weather && (
      <WeatherCard weather={weather} city={displayCity} />
      )}
      {error && <p>Erreur : {error}</p>}

      <SearchHistory history={searchHistory} onCityClick={handleHistoryClick} />


    </div>
  );
}

export default App;