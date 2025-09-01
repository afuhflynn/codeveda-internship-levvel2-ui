import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";
import { useContext } from "react";
import { GlobalContext } from "../components/providers/context-provider";
import { useEffect } from "react";

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
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Your Modern Todo App</h1>
          <p>Stay productive, stay organized — manage your tasks with ease.</p>
          <Link to="/dashboard">
            <button className="cta-btn">Get Started</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
