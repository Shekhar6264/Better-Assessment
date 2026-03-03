import { useState } from "react";
import { login, signup } from "../services/auth";

function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const data = await login(email, password);

        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);

        onClose();
        window.location.reload();
      } else {
        await signup(email, password);
        alert("Account created successfully! Please login.");
        setIsLogin(true);   // switch to login view
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <div className="close-btn" onClick={onClose}>×</div>

        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        <input
          className="auth-input"
          placeholder="Your Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="auth-button" onClick={handleSubmit}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <div
          className="auth-toggle"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? (
            <>Don't have an account? <span>Create Account</span></>
          ) : (
            <>Already have an account? <span>Login</span></>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;