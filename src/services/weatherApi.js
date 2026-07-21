export async function getWeather(city) {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données météo');
    }


    const data = await response.json();
    console.log('Données météo récupérées :', data);
    if (data.results && data.results.length > 0) {
        const { latitude, longitude } = data.results[0];
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

        if (!weatherResponse.ok) {
            throw new Error('Erreur lors de la récupération des données météo');
        }
        
        const weatherData = await weatherResponse.json();
        console.log('Données météo récupérées :', weatherData);
        return weatherData;
    } else {
        throw new Error('Ville non trouvée');
    }
}