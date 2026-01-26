import { useEffect, useState } from "react";
import ScoreCard from "../components/ScoreCard";

const Scores = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(
          "https://api.balldontlie.io/v1/games?per_page=10",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_BALLDONTLIE_KEY}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} - Unauthorized`);
        }

        const data = await res.json();
        setGames(data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load games");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="scores">
      <h1>Live NBA Games</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <section className="score-cards">
        {games.map((game) => (
          <ScoreCard key={game.id} match={game} />
        ))}
      </section>
    </div>
  );
};

export default Scores;