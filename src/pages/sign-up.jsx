import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GlobalContext } from "../components/providers/context-provider";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { signUp } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!form.name || !form.email || !form.password) {
        return toast.error("All fields are required.");
      }
      const result = await signUp(form);
      if (!result) {
        return toast.error("An unexpected error occurred. Try again later.");
      }

      toast.success("Account created!");
      navigate("/signin");
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
        <h2 className="auth-title">Create Account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
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
            {isLoading ? "Signin up..." : "Sign Up"}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
}
