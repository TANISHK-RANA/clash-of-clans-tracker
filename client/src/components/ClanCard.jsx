import './ClanCard.css';

const ClanCard = ({ clan }) => {
  const getWarFrequencyLabel = (frequency) => {
    const frequencies = {
      always: 'Always',
      moreThanOncePerWeek: 'Twice a Week',
      oncePerWeek: 'Once a Week',
      lessThanOncePerWeek: 'Rarely',
      never: 'Never',
      unknown: 'Unknown'
    };
    return frequencies[frequency] || frequency;
  };

  const getClanTypeLabel = (type) => {
    const types = {
      open: 'Open',
      inviteOnly: 'Invite Only',
      closed: 'Closed'
    };
    return types[type] || type;
  };

  const getTypeColor = (type) => {
    const colors = {
      open: 'var(--accent-green)',
      inviteOnly: 'var(--gold-primary)',
      closed: 'var(--accent-red)'
    };
    return colors[type] || 'var(--text-secondary)';
  };

  const calculateWinRate = () => {
    const total = clan.warWins + (clan.warLosses || 0);
    if (total === 0) return 0;
    return Math.round((clan.warWins / total) * 100);
  };

  return (
    <div className="clan-card">
      <div className="clan-header">
        <div className="clan-badge-container">
          {clan.badgeUrls?.large && (
            <img 
              src={clan.badgeUrls.large} 
              alt={clan.name}
              className="clan-badge-large"
            />
          )}
        </div>
        <div className="clan-info">
          <h2 className="clan-name">{clan.name}</h2>
          <span className="clan-tag">#{clan.tag.replace('#', '')}</span>
          <div className="clan-meta">
            <span 
              className="clan-type"
              style={{ color: getTypeColor(clan.type) }}
            >
              {getClanTypeLabel(clan.type)}
            </span>
            <span className="clan-level">Level {clan.clanLevel}</span>
          </div>
        </div>
      </div>

      {clan.description && (
        <div className="clan-description">
          <p>{clan.description}</p>
        </div>
      )}

      <div className="clan-stats-grid">
        <div className="stat-box primary">
          <span className="stat-icon">👥</span>
          <span className="stat-value">{clan.members}/50</span>
          <span className="stat-label">Members</span>
        </div>
        <div className="stat-box primary">
          <span className="stat-icon">🏆</span>
          <span className="stat-value">{clan.clanPoints?.toLocaleString()}</span>
          <span className="stat-label">Clan Points</span>
        </div>
        <div className="stat-box">
          <span className="stat-icon">⚔️</span>
          <span className="stat-value">{clan.warWins}</span>
          <span className="stat-label">War Wins</span>
        </div>
        <div className="stat-box">
          <span className="stat-icon">📊</span>
          <span className="stat-value">{calculateWinRate()}%</span>
          <span className="stat-label">Win Rate</span>
        </div>
      </div>

      <div className="clan-details">
        <div className="detail-row">
          <span className="detail-label">🗡️ War Frequency</span>
          <span className="detail-value">{getWarFrequencyLabel(clan.warFrequency)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">🏅 War Win Streak</span>
          <span className="detail-value">{clan.warWinStreak}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">🌍 Location</span>
          <span className="detail-value">{clan.location?.name || 'Not set'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">🎯 Required Trophies</span>
          <span className="detail-value">{clan.requiredTrophies}</span>
        </div>
        {clan.requiredTownhallLevel && (
          <div className="detail-row">
            <span className="detail-label">🏰 Required TH</span>
            <span className="detail-value">Level {clan.requiredTownhallLevel}</span>
          </div>
        )}
      </div>

      {clan.labels && clan.labels.length > 0 && (
        <div className="clan-labels">
          <h3 className="section-title">Clan Labels</h3>
          <div className="labels-container">
            {clan.labels.map((label) => (
              <div key={label.id} className="label-item">
                {label.iconUrls?.small && (
                  <img 
                    src={label.iconUrls.small} 
                    alt={label.name}
                    className="label-icon"
                  />
                )}
                <span>{label.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {clan.memberList && clan.memberList.length > 0 && (
        <div className="clan-members-preview">
          <h3 className="section-title">Top Members</h3>
          <div className="members-list">
            {clan.memberList.slice(0, 5).map((member, index) => (
              <div key={member.tag} className="member-row">
                <span className="member-rank">#{index + 1}</span>
                <span className="member-name">{member.name}</span>
                <span className="member-role">{member.role}</span>
                <span className="member-trophies">🏆 {member.trophies}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClanCard;

