function SearchHistory({ history, onCityClick   }) {
  return (
    <div>  
        <h2>Historique des recherches :</h2>

      <ul>
        {history.map((searchedCity) => (
          <li key={searchedCity} onClick={() => onCityClick(searchedCity)}>
            {searchedCity}
          </li>
        ))}
      </ul>
    </div>
  );
}





export default SearchHistory;