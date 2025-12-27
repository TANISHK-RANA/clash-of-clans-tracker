import { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch, isLoading }) => {
  const [searchType, setSearchType] = useState('player');
  const [tag, setTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tag.trim()) {
      onSearch(searchType, tag.trim());
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-type-toggle">
        <button
          type="button"
          className={`toggle-btn ${searchType === 'player' ? 'active' : ''}`}
          onClick={() => setSearchType('player')}
        >
          <span className="toggle-icon">⚔️</span>
          Player
        </button>
        <button
          type="button"
          className={`toggle-btn ${searchType === 'clan' ? 'active' : ''}`}
          onClick={() => setSearchType('clan')}
        >
          <span className="toggle-icon">🏰</span>
          Clan
        </button>
      </div>

      <div className="search-input-group">
        <span className="tag-prefix">#</span>
        <input
          type="text"
          className="search-input"
          placeholder={`Enter ${searchType} tag (e.g., 2PP)`}
          value={tag}
          onChange={(e) => setTag(e.target.value.toUpperCase())}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="search-btn"
          disabled={isLoading || !tag.trim()}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <p className="search-hint">
        Enter the tag without the # symbol. Tags are case-insensitive.
      </p>
    </form>
  );
};

export default SearchForm;

