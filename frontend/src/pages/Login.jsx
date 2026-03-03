import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleLogin}>
        <h2>Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Create Account</span>
        </p>
      </form>
    </div>
  );
}

export default Login;