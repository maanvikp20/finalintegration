import { useEffect, useState } from "react";
import ScoreCard from "../components/ScoreCard";

const Scores = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  async function fetchBasketballScores() {
    try {
      const res = await fetch(
        "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = await res.json();
      return data.events || [];
    } catch (err) {
      console.error("Error fetching basketball scores:", err);
      throw err;
    }
  }

  const loadGames = async () => {
    setLoading(true);
    setError("");
    try {
      const events = await fetchBasketballScores();
      setGames(events);
      setLastUpdated(new Date());
    } catch (err) {
      setError("Failed to load scores. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!mounted) return;
      await loadGames();
    };

    load();
    
    // Refresh every 30 seconds
    const intervalId = setInterval(() => {
      if (mounted) load();
    }, 30000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="scores">
      {/* Header */}
      <div className="scores-header">
        <h1>🏀 Live NBA Games</h1>
        {lastUpdated && !loading && (
          <div className="last-updated">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p className="loading-text">Loading scores...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="error-container">
          <div className="error-box">
            <svg 
              className="error-icon" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <p className="error">{error}</p>
            <button onClick={loadGames} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Games Grid */}
      {!loading && !error && (
        <>
          {games.length === 0 ? (
            <div className="empty-state">
              <svg 
                className="empty-icon" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <h2>No games scheduled today</h2>
              <p>Check back later for updates</p>
            </div>
          ) : (
            <>
              <div className="games-count">
                Showing {games.length} {games.length === 1 ? 'game' : 'games'}
              </div>
              <div className="score-cards">
                {games.map((game, index) => (
                  <ScoreCard 
                    key={game.id || `game-${index}`} 
                    game={game} 
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* Auto-refresh indicator */}
      {!loading && !error && games.length > 0 && (
        <div className="auto-refresh">
          <p>⟳ Auto-refreshing every 30 seconds</p>
        </div>
      )}
    </div>
  );
};

export default Scores;