import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GlobalContext } from "../components/providers/context-provider";
import "../styles/auth.css";

export default function SigninPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useContext(GlobalContext);

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/dashboard");
    }
  }, [user, navigate, isLoading]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!form.email || !form.password) {
        return toast.error("All fields are required.");
      }
      const result = await signIn(form);
      if (!result) {
        return toast.error("An unexpected error occurred. Try again later.");
      }

      toast.success("Singin successful!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        return toast.error(error.response.data.error);
      }
      if (error.status && error.status === 409) {
        return toast.error(`User email: ${form.email} already exists.`);
      }

      toast.error("An unexpected error occurred. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h2 className="auth-title">Sign In</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Signin in..." : "Sign In"}
          </button>
        </form>
        <p className="auth-switch">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
