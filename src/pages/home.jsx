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
      <section className="home-hero">
        <div className="hero-content">
          <h1>Welcome to Your Modern Todo App</h1>
          <Link to={user ? "/dashboard" : "/signin"}>
            <button className="cta-btn">Get Started</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
