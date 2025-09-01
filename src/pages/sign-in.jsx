import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GlobalContext } from "../components/providers/context-provider";

export default function SigninPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user, getUserProfile } = useContext(GlobalContext);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

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
      <div className="auth-card">
        <h2 className="auth-title">Sign In</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Signin in..." : "Sign In"}
          </button>
        </form>
        <p className="auth-switch">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
