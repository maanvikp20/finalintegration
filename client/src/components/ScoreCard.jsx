const ScoreCard = ({ game }) => {
  if (!game || !game.competitions?.[0]) {
    return (
      <div className="score-card">
        <p style={{ textAlign: 'center', color: '#94a3b8' }}>No game data available</p>
      </div>
    );
  }

  const competition = game.competitions[0];
  const status = competition.status;
  const competitors = competition.competitors;
  
  // Find home and away teams
  const homeTeam = competitors.find(c => c.homeAway === 'home');
  const awayTeam = competitors.find(c => c.homeAway === 'away');

  // Determine game state
  const isLive = status.type.state === 'in';
  const isCompleted = status.type.state === 'post';
  const isScheduled = status.type.state === 'pre';

  // Get odds if available
  const odds = competition.odds?.[0];
  const spread = odds?.details;
  const overUnder = odds?.overUnder;

  // Determine status badge class
  let statusClass = 'status-badge ';
  if (isLive) statusClass += 'status-live';
  else if (isCompleted) statusClass += 'status-final';
  else statusClass += 'status-scheduled';

  let statusText = '';
  if (isLive) statusText = `LIVE - ${status.displayClock}`;
  else if (isCompleted) statusText = 'FINAL';
  else statusText = status.type.shortDetail;

  const getRank = (team) => {
    return team?.curatedRank?.current;
  };

  const renderTeamName = (team) => {
    const rank = getRank(team);
    const displayName = team?.team?.displayName || 'Team';
    
    if (rank && rank <= 25) {
      return (
        <>
          <span className="rank-badge">{rank}</span>
          {displayName}
        </>
      );
    }
    return displayName;
  };

  return (
    <div className="score-card">
      <div className="status-header">
        <span className={statusClass}>
          {statusText}
        </span>
        {isLive && (
          <span className="period-info">
            {status.period > 2 ? `OT ${status.period - 2}` : `Period ${status.period}`}
          </span>
        )}
      </div>

      <div className="teams-container">
        <div className="team-row">
          <div className="team-info">
            {awayTeam?.team?.logo && (
              <img 
                src={awayTeam.team.logo} 
                alt={awayTeam.team.abbreviation}
                className="team-logo"
              />
            )}
            <div className="team-details">
              <p className="team-name">
                {renderTeamName(awayTeam)}
              </p>
              <p className="team-record">
                {awayTeam?.records?.[0]?.summary || ''}
              </p>
            </div>
          </div>
          <span className="team-score">
            {awayTeam?.score || '0'}
          </span>
        </div>

        <div className="team-row">
          <div className="team-info">
            {homeTeam?.team?.logo && (
              <img 
                src={homeTeam.team.logo} 
                alt={homeTeam.team.abbreviation}
                className="team-logo"
              />
            )}
            <div className="team-details">
              <p className="team-name">
                {renderTeamName(homeTeam)}
              </p>
              <p className="team-record">
                {homeTeam?.records?.[0]?.summary || ''}
              </p>
            </div>
          </div>
          <span className="team-score">
            {homeTeam?.score || '0'}
          </span>
        </div>
      </div>

      {isScheduled && (spread || overUnder) && (
        <div className="betting-info">
          {spread && (
            <div className="betting-item">
              <p className="betting-label">Spread</p>
              <p className="betting-value">{spread}</p>
            </div>
          )}
          {overUnder && (
            <div className="betting-item">
              <p className="betting-label">O/U</p>
              <p className="betting-value">{overUnder}</p>
            </div>
          )}
        </div>
      )}

      {competition.venue && (
        <div className="venue-info">
          <p className="venue-text">
            {competition.venue.fullName}
            {competition.venue.address?.city && 
              `, ${competition.venue.address.city}, ${competition.venue.address.state}`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ScoreCard;