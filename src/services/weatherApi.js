export async function getWeather(city) {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`
    );

    if (!response.ok) {
        throw new Error('le service de géocodage est indisponible pour le moment');
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
        const { latitude, longitude } = data.results[0];
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day&timezone=auto&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm`
        );

        if (!weatherResponse.ok) {
            throw new Error('le service météo est indisponible pour le moment');
        }
        
        return await weatherResponse.json();
    } else {
        throw new Error('aucune ville ne correspond à votre recherche');
    }
}
