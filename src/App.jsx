
import { getWeather } from './services/weatherApi';
import WeatherCard from './components/WeatherCard';
import { useState, useEffect } from "react";


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayCity, setDisplayCity] = useState(''); // État pour stocker la ville affichée
  const [searchHistory, setSearchHistory] = useState([]); // État pour stocker l'historique des recherches


  useEffect(() => {
    async function loadDefaultWeather() {

      const weatherData = await getWeather("Lomé");

      setWeather(weatherData);
      setDisplayCity("Lomé");
    }

   loadDefaultWeather();
  }, []);

  async function handleSearch(e) {

    e.preventDefault(); // Empêcher le rechargement de la page  
    // Logique de recherche de la ville

    console.log(`Recherche de la ville : ${city}`);
    setLoading(true);


    try {
      const weatherData = await getWeather(city);
      setWeather(weatherData);
      setDisplayCity(city);


      if (!searchHistory.includes(cityfound)) {
        setSearchHistory((prev) => [...prev, city]);
      }

    } catch (error) {
      console.error('Erreur lors de la récupération des données météo :', error);
      setError(error.message);

    } finally {
      setLoading(false);
    }

    setCity(''); // Réinitialiser le champ de saisie après la recherche
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
        <button type="submit">Rechercher</button>
      </form>     
    
    
      {loading && <p>Chargement...</p>}
      {weather && (
      <WeatherCard weather={weather} city={displayCity} />
      )}
      {error && <p>Erreur : {error}</p>}
    </div>
  );
}

export default App;