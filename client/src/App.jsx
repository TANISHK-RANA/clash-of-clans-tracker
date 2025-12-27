import { useState } from 'react';
import SearchForm from './components/SearchForm';
import PlayerCard from './components/PlayerCard';
import ClanCard from './components/ClanCard';
import Loader from './components/Loader';
import { getPlayer, getClan } from './services/api';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [dataType, setDataType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (type, tag) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    setDataType(null);

    try {
      let result;
      if (type === 'player') {
        result = await getPlayer(tag);
      } else {
        result = await getClan(tag);
      }
      setData(result);
      setDataType(type);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo-icon">⚔️</span>
            <h1 className="app-title">Clash of Clans Tracker</h1>
          </div>
          <p className="app-subtitle">
            Search for players and clans to view their stats
          </p>
        </div>
        <div className="header-decoration"></div>
      </header>

      <main className="app-main">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {isLoading && <Loader />}

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {data && dataType === 'player' && <PlayerCard player={data} />}
        {data && dataType === 'clan' && <ClanCard clan={data} />}

        {!data && !isLoading && !error && (
          <div className="welcome-section">
            <div className="welcome-card">
              <h2>Welcome, Chief!</h2>
              <p>
                Enter a player or clan tag above to search for their stats.
                You can find tags in the game under the player or clan profile.
              </p>
              <div className="example-tags">
                <div className="example">
                  <span className="example-label">Example Player Tag:</span>
                  <code>#2PP</code>
                </div>
                <div className="example">
                  <span className="example-label">Example Clan Tag:</span>
                  <code>#2QU2UCJJ</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          This content is not affiliated with, endorsed, sponsored, or specifically 
          approved by Supercell and Supercell is not responsible for it.
        </p>
        <p className="footer-disclaimer">
          For more information see Supercell's Fan Content Policy.
        </p>
      </footer>
    </div>
  );
}

export default App;

