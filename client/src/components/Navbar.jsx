import { Link } from "react-router";

export default function Navbar() {
  async function handleLogout(e) {
    e.preventDefault(); // Mencegah reload halaman
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          AnimeList
        </Link>
        {/* ✅ Tombol Hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ✅ Menu yang akan muncul di mobile */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorite">
                Favorites
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/talk">
                Talk AI
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger ms-3" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
