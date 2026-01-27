import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <h1>Track. Analyze. Win.</h1>
        <p>
          Your all-in-one hub for live scores, performance stats, and
          competitive insights.
        </p>

        <div className="hero-actions">
          <Link to="/scores" className="btn primary">
            View Live Scores
          </Link>
          <Link to="/dashboard" className="btn secondary">
            Dashboard
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat-card">
          <h2>1+</h2>
          <span>Teams Tracked</span>
        </div>
        <div className="stat-card">
          <h2>1+</h2>
          <span>Games Logged</span>
        </div>
        <div className="stat-card">
          <h2>67.67%</h2>
          <span>Uptime</span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature">
          <h3>📊 Advanced Stats</h3>
          <p>Break down performance with clean, readable analytics.</p>
        </div>
        <div className="feature">
          <h3>⚡ Real-Time Updates</h3>
          <p>Instant score updates so you never miss a moment.</p>
        </div>
        <div className="feature">
          <h3>🏆 Competitive Insights</h3>
          <p>Compare teams, players, and trends with ease.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;