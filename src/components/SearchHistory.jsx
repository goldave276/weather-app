function SearchHistory({ history, onCityClick }) {
  return (
    <section className="history-card">
      <div className="section-heading">
        <p className="section-kicker">Recherches récentes</p>
        <h2>Historique</h2>
      </div>

      {history.length === 0 ? (
        <p className="history-empty">Les villes recherchées apparaîtront ici.</p>
      ) : (
        <ul className="history-list">
          {history.map((searchedCity) => (
            <li key={searchedCity}>
              <button
                type="button"
                className="history-chip"
                onClick={() => onCityClick(searchedCity)}
              >
                {searchedCity}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}





export default SearchHistory;
