import React from 'react'

const ScoreCard = ({ match }) => {
  return (
    <div className="score-card">
      <h3>{match.home} vs {match.away}</h3>
      <p>{match.homeScore} - {match.awayScore}</p>
      <p>Status: {match.status}</p>
      <p>Time: {formatDate(match.time)}</p>
    </div>
  )
}

export default ScoreCard