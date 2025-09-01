import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SigninPage from "./pages/sign-in";
import SignupPage from "./pages/sign-up";
import HomePage from "./pages/home";
import Todos from "./pages/dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Todos />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<SigninPage />} />
      </Routes>
    </Router>
  );
}
