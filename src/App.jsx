
import { useState, useEffect } from 'react';
import { getWeather } from './services/weatherApi';
import WeatherCard from './components/WeatherCard';
import SearchHistory from './components/SearchHistory';
import './App.css';


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayCity, setDisplayCity] = useState('');
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    const savedTheme = window.localStorage.getItem('weather-theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
 
  const [searchHistory, setSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem('searchHistory');

    if (savedHistory) {
      try {
        return JSON.parse(savedHistory);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'historique depuis le localStorage :", error);
        return [];
      }
    }
    return [];
  });


  useEffect(() => {
    loadWeather('Lomé');
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('weather-theme', theme);
  }, [theme]);


  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);



  async function loadWeather(cityName) {
    const normalizedCity = cityName.trim();

    setLoading(true);

    try {
      const weatherData = await getWeather(normalizedCity);
      setWeather(weatherData);
      setDisplayCity(normalizedCity);

      setSearchHistory((prev) => {
        if (prev.some((savedCity) => savedCity.toLowerCase() === normalizedCity.toLowerCase())) {
          return prev;
        }
        return [normalizedCity, ...prev].slice(0, 8);
      });

      setError(null);
    } catch (error) {
      setError(error.message || 'Une erreur est survenue lors de la récupération des données.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {

    e.preventDefault();

    if (!city.trim()) {
      return;
    }

    await loadWeather(city);
    setCity('');
  }

  function handleHistoryClick(city) {
    loadWeather(city);
  }

  function handleThemeToggle() {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  }


  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="topbar">
          <div className="brand-lockup">
            <span className="brand-mark">WX</span>
            <div>
              <p className="eyebrow">Tableau météo</p>
              <p className="brand-name">Aperçu météo</p>
            </div>
          </div>

          <button
            type="button"
            className="theme-toggle"
            onClick={handleThemeToggle}
            aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
          >
            {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          </button>
        </div>

        <div className="hero-copy">
          <h1>Consultez la météo avec une interface claire, moderne et rapide.</h1>
          <p className="hero-text">
            Recherchez une ville, visualisez les conditions actuelles et retrouvez vos
            dernières recherches dans un espace lisible et professionnel.
          </p>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <label className="sr-only" htmlFor="city-search">
            Rechercher une ville
          </label>
          <input
            id="city-search"
            className="search-input"
            type="text"
            placeholder="Saisissez le nom d'une ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="search-button" type="submit" disabled={loading || !city.trim()}>
            {loading ? 'Recherche en cours...' : 'Rechercher'}
          </button>
        </form>
      </section>

      <section className="content-grid">
        <div className="results-column">
          {loading && <p className="status-message">Chargement des données météo en cours...</p>}
          {error && <p className="status-message status-error">Impossible de charger la météo : {error}</p>}
          {weather && <WeatherCard weather={weather} city={displayCity} />}
        </div>

        <aside className="history-panel">
          <SearchHistory history={searchHistory} onCityClick={handleHistoryClick} />
        </aside>
      </section>
    </main>
  );
}

export default App;
