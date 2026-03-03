import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";

function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showAuth, setShowAuth] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value); // 👈 send to Home
  };

  return (
    <>
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          EventX
        </div>

        <input
          className="search"
          placeholder="Search for Events..."
          value={searchText}
          onChange={handleSearch}
        />

        {token ? (
          <button
            className="nav-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="nav-btn"
            onClick={() => setShowAuth(true)}
          >
            Sign In
          </button>
        )}
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}

export default Navbar;