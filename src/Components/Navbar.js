import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Navbar({
  title = "My Website",
  about = "About Us",
  links = [], 
  dropdownTitle = "Dropdown",
  dropdownItems = ["one", "two", "three"],
  mode,
  toggleMode, // ✅ fixed prop name
  onSearch
}) {
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) {
      alert("Please enter a search term!");
      return;
    }
    if (onSearch && typeof onSearch === "function") {
      onSearch(trimmed);
    } else {
      window.location.href = `/search?q=${encodeURIComponent(trimmed)}`;
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${mode} bg-${
        mode === "light" ? "blue" : "dark"
      } ${scrolled ? "shadow-sm" : ""} transition-all`} 
      style={{ backgroundColor: mode === "dark" ? "black" : "white", color: mode ==="dark" ? "white" : "black"}}
    >
      <div className="container" style={{ backgroundColor: mode === "dark" ? "black" : "white", color: mode ==="dark" ? "white" : "black", borderRadius: 10, height: 75}}>
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          {title}
        </Link>

        {/* Mobile Menu Toggle */}
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

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map((link, index) => (
              <li key={index} className="nav-item">
                <Link
                  className={`nav-link ${link.active ? "active fw-semibold" : ""}`}
                  to={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Dropdown */}
            {dropdownItems.length > 0 && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {dropdownTitle}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {dropdownItems.map((item, idx) => {
                    const label = typeof item === "string" ? item : item.label;
                    const href = typeof item === "string" ? `/${item}` : item.href;
                    return (
                      <li key={idx}>
                        <Link className="dropdown-item" to={href}>
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            )}

            {/* About */}
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                {about}
              </Link>
            </li>
          </ul>
          </div>

          {/* Search */} 
        <form
          style={{
              backgroundColor: mode === "dark" ? "black" : "white",
              color: mode === "dark" ? "white" : "black",
              maxWidth: "350px"
              }}
          className="flex"
          role="search"
          onSubmit={handleSearchSubmit}
          >
          <input 
          name="search"
          className="form-control me-2"
          aria-label="Search"
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="on"
          />
          <button
            className={`btn btn-${mode === "light" ? "light" : "dark"} button`}
            type="submit"
            style={{
              backgroundColor: mode === "dark" ? "black" : "white",
              color: mode === "dark" ? "white" : "black",
              }}
            > Search
          </button>
       </form>
          {/* Dark Mode Toggle */}
          <div className={`form-check form-switch ms-3 text-${mode === "light" ? "dark" : "light"}`}>
            <input
              className="form-check-input"
              onChange={toggleMode} // ✅ now works
              type="checkbox"
              role="switch"
              id="darkModeSwitch"
              checked={mode === "dark"} // ✅ keeps state in sync
            />
            <label
              className="form-check-label"
              htmlFor="darkModeSwitch"
              style={{ cursor: "pointer", color: mode ==="dark" ? "#f8f9fa" : "black" }}
            >
              {mode === "light" ? "Dark Mode" : "Light Mode"}
            </label>
          </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
  about: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      active: PropTypes.bool
    })
  ),
  dropdownTitle: PropTypes.string,
  dropdownItems: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired
      })
    ])
  ),
  mode: PropTypes.oneOf(["light", "dark"]),
  toggleMode: PropTypes.func.isRequired,
  onSearch: PropTypes.func
};
