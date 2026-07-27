import './weatherCard.css';

function SunIcon() {
  return (
    <svg viewBox="0 0 64 64" className="weather-icon" aria-hidden="true">
      <circle cx="32" cy="32" r="12" />
      <g>
        <path d="M32 6v10" />
        <path d="M32 48v10" />
        <path d="M6 32h10" />
        <path d="M48 32h10" />
        <path d="M13 13l7 7" />
        <path d="M44 44l7 7" />
        <path d="M13 51l7-7" />
        <path d="M44 20l7-7" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 64 64" className="weather-icon" aria-hidden="true">
      <path d="M38 8a22 22 0 1 0 18 34A24 24 0 1 1 38 8Z" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 64 64" className="weather-icon" aria-hidden="true">
      <path d="M20 46h24a10 10 0 0 0 0-20 14 14 0 0 0-27-2A9 9 0 0 0 20 46Z" />
    </svg>
  );
}

function PartlyCloudyIcon({ isDay }) {
  return (
    <svg viewBox="0 0 64 64" className="weather-icon" aria-hidden="true">
      {isDay ? <circle cx="22" cy="22" r="10" /> : <path d="M26 10a14 14 0 1 0 12 22A16 16 0 1 1 26 10Z" />}
      <path d="M18 46h28a10 10 0 0 0 0-20 14 14 0 0 0-25-4A10 10 0 0 0 18 46Z" />
    </svg>
  );
}

function RainIcon() {
  return (
    <svg viewBox="0 0 64 64" className="weather-icon" aria-hidden="true">
      <path d="M20 38h24a10 10 0 0 0 0-20 14 14 0 0 0-27-2A9 9 0 0 0 20 38Z" />
      <path d="M22 44l-3 8" />
      <path d="M32 44l-3 8" />
      <path d="M42 44l-3 8" />
    </svg>
  );
}

function SnowIcon() {
  return (
    <svg viewBox="0 0 64 64" className="weather-icon" aria-hidden="true">
      <path d="M20 38h24a10 10 0 0 0 0-20 14 14 0 0 0-27-2A9 9 0 0 0 20 38Z" />
      <path d="M22 45h0" />
      <path d="M22 44v8" />
      <path d="M18 48h8" />
      <path d="M32 44v8" />
      <path d="M28 48h8" />
      <path d="M42 44v8" />
      <path d="M38 48h8" />
    </svg>
  );
}

function FogIcon() {
  return (
    <svg viewBox="0 0 64 64" className="weather-icon" aria-hidden="true">
      <path d="M18 28h28a8 8 0 0 0 0-16 12 12 0 0 0-23-2A8 8 0 0 0 18 28Z" />
      <path d="M12 40h40" />
      <path d="M16 48h32" />
      <path d="M20 56h24" />
    </svg>
  );
}

function StormIcon() {
  return (
    <svg viewBox="0 0 64 64" className="weather-icon" aria-hidden="true">
      <path d="M20 38h24a10 10 0 0 0 0-20 14 14 0 0 0-27-2A9 9 0 0 0 20 38Z" />
      <path d="M34 39l-7 13h7l-4 10 12-16h-7l5-7Z" />
    </svg>
  );
}

function getWeatherMeta(code, isDay) {
  if (code === 0) {
    return { label: isDay ? 'Ciel dégagé' : 'Nuit claire', icon: isDay ? <SunIcon /> : <MoonIcon /> };
  }

  if (code === 1 || code === 2) {
    return { label: 'Partiellement nuageux', icon: <PartlyCloudyIcon isDay={isDay} /> };
  }

  if (code === 3) {
    return { label: 'Nuageux', icon: <CloudIcon /> };
  }

  if (code === 45 || code === 48) {
    return { label: 'Brouillard', icon: <FogIcon /> };
  }

  if (code >= 51 && code <= 57) {
    return { label: 'Bruine', icon: <RainIcon /> };
  }

  if (code >= 61 && code <= 67) {
    return { label: 'Pluie', icon: <RainIcon /> };
  }

  if (code >= 71 && code <= 77) {
    return { label: 'Neige', icon: <SnowIcon /> };
  }

  if (code >= 80 && code <= 82) {
    return { label: 'Averses', icon: <RainIcon /> };
  }

  if (code >= 85 && code <= 86) {
    return { label: 'Averses de neige', icon: <SnowIcon /> };
  }

  if (code === 95 || code === 96 || code === 99) {
    return { label: 'Orage', icon: <StormIcon /> };
  }

  return { label: 'Conditions météo', icon: <CloudIcon /> };
}

function WeatherCard({ weather, city }) {
  const current = weather.current;
  const weatherMeta = getWeatherMeta(current.weather_code, current.is_day);
  const formattedTime = new Date(current.time).toLocaleString();

  return (
    <article className="weather-card">
      <div className="card-header">
        <p className="card-kicker">Conditions actuelles</p>
        <div className="city-row">
          <h2 className="city-name">📍 {city}</h2>
          <span className="day-night-badge">{current.is_day ? 'En journée' : 'De nuit'}</span>
        </div>
      </div>

      <div className="weather-hero">
        <div className="weather-hero-copy">
          <span className="temp-value">{Math.round(current.temperature_2m)}°C</span>
          <p className="weather-summary">{weatherMeta.label}</p>
          <p className="feels-like">Ressenti: {Math.round(current.apparent_temperature)}°C</p>
        </div>

        <div className="weather-icon-shell">{weatherMeta.icon}</div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Humidité</span>
          <span className="detail-value">{current.relative_humidity_2m}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Vent</span>
          <span className="detail-value">{current.wind_speed_10m} km/h</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Direction</span>
          <span className="detail-value">{current.wind_direction_10m}°</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Mise à jour</span>
          <span className="detail-value">{formattedTime}</span>
        </div>
      </div>
    </article>
  );
}

export default WeatherCard;
