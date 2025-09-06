import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../components/providers/context-provider";

export default function HomePage() {
  const { user, isLoading } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/dashboard");
    }
  }, [user, navigate, isLoading]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content">
          <h1 className="hero-title">Organize smarter. Stay focused</h1>
          <p className="hero-subtitle">
            A modern Todo app to keep track of everything that matters — simple,
            fast, and beautifully designed.
          </p>
          <div className="hero-buttons">
            <Link to={user ? "/dashboard" : "/sign-up"}>
              <button className="cta-btn primary">Create Free Account</button>
            </Link>
            <Link to="/sign-in">
              <button className="cta-btn secondary">Sign In</button>
            </Link>
          </div>
        </div>
        <div className="hero-preview">
          <img src="/preview.png" alt="App preview" className="preview-img" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>Simple & Intuitive</h3>
          <p>
            Minimal design that helps you focus on your tasks, not the tool.
          </p>
        </div>
        <div className="feature-card">
          <h3>Stay Synced</h3>
          <p>Access your todos anywhere, anytime with cloud sync.</p>
        </div>
        <div className="feature-card">
          <h3>Boost Productivity</h3>
          <p>Analytics and reminders to keep you on track effortlessly.</p>
        </div>
      </section>
    </div>
  );
}
