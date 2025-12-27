import './PlayerCard.css';

const PlayerCard = ({ player }) => {
  const getTownHallIcon = (level) => {
    if (level >= 15) return '🏰';
    if (level >= 12) return '🏯';
    if (level >= 9) return '🏠';
    return '🏡';
  };

  const getLeagueColor = (league) => {
    if (!league) return '#888';
    const name = league.name.toLowerCase();
    if (name.includes('legend')) return '#9b59b6';
    if (name.includes('titan')) return '#3498db';
    if (name.includes('champion')) return '#e74c3c';
    if (name.includes('master')) return '#2ecc71';
    if (name.includes('crystal')) return '#9b59b6';
    if (name.includes('gold')) return '#f1c40f';
    if (name.includes('silver')) return '#bdc3c7';
    if (name.includes('bronze')) return '#cd6133';
    return '#888';
  };

  const formatRole = (role) => {
    const roles = {
      leader: 'Leader',
      coLeader: 'Co-Leader',
      admin: 'Elder',
      member: 'Member'
    };
    return roles[role] || role;
  };

  return (
    <div className="player-card">
      <div className="player-header">
        <div className="player-name-section">
          <h2 className="player-name">{player.name}</h2>
          <span className="player-tag">#{player.tag.replace('#', '')}</span>
        </div>
        {player.league && (
          <div 
            className="player-league"
            style={{ borderColor: getLeagueColor(player.league) }}
          >
            {player.league.iconUrls?.small && (
              <img 
                src={player.league.iconUrls.small} 
                alt={player.league.name}
                className="league-icon"
              />
            )}
            <span style={{ color: getLeagueColor(player.league) }}>
              {player.league.name}
            </span>
          </div>
        )}
      </div>

      <div className="player-stats-grid">
        <div className="stat-box">
          <span className="stat-icon">{getTownHallIcon(player.townHallLevel)}</span>
          <span className="stat-value">{player.townHallLevel}</span>
          <span className="stat-label">Town Hall</span>
        </div>
        <div className="stat-box">
          <span className="stat-icon">🏆</span>
          <span className="stat-value">{player.trophies.toLocaleString()}</span>
          <span className="stat-label">Trophies</span>
        </div>
        <div className="stat-box">
          <span className="stat-icon">⭐</span>
          <span className="stat-value">{player.expLevel}</span>
          <span className="stat-label">XP Level</span>
        </div>
        <div className="stat-box">
          <span className="stat-icon">⚔️</span>
          <span className="stat-value">{player.warStars.toLocaleString()}</span>
          <span className="stat-label">War Stars</span>
        </div>
      </div>

      {player.clan && (
        <div className="player-clan-info">
          <div className="clan-badge-section">
            {player.clan.badgeUrls?.small && (
              <img 
                src={player.clan.badgeUrls.small} 
                alt={player.clan.name}
                className="clan-badge"
              />
            )}
            <div>
              <p className="clan-name">{player.clan.name}</p>
              <p className="clan-role">{formatRole(player.role)}</p>
            </div>
          </div>
        </div>
      )}

      {player.heroes && player.heroes.length > 0 && (
        <div className="player-heroes">
          <h3 className="section-title">Heroes</h3>
          <div className="heroes-grid">
            {player.heroes.map((hero) => (
              <div key={hero.name} className="hero-item">
                <span className="hero-name">{hero.name}</span>
                <span className="hero-level">Lv. {hero.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="player-achievements">
        <div className="achievement-stat">
          <span className="achievement-label">Best Trophies</span>
          <span className="achievement-value">🏆 {player.bestTrophies?.toLocaleString() || 0}</span>
        </div>
        <div className="achievement-stat">
          <span className="achievement-label">Donations</span>
          <span className="achievement-value">📦 {player.donations?.toLocaleString() || 0}</span>
        </div>
        <div className="achievement-stat">
          <span className="achievement-label">Received</span>
          <span className="achievement-value">📥 {player.donationsReceived?.toLocaleString() || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;

