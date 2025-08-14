import React, { useState, useEffect } from "react";

export default function TextForm({showalert, heading, mode}) {
  const [text, setText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  // Demo credentials
  const validEmail = "tejas.mellimpudi@gmail.com";
  const validPassword = "1234";

  // Auto-login if session exists
  useEffect(() => {
    const session = localStorage.getItem("isLoggedIn");
    if (session === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      email.trim().toLowerCase() === validEmail &&
      password === validPassword
    ) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      showalert("LoggedIn successfully", "success");
      setError("");
    } else {
      setError("❌ Invalid email or password");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setText("");
    setEmail("");
    setPassword("");
    setError("");
    localStorage.removeItem("isLoggedIn");
    showalert("LoggedOut successfully", "success");
  };

  // Text actions
  const handleUppercase = () => {
    setText(text.toUpperCase());
    showalert("Converted to uppercase", "success");
  }
  const handleLowercase = () => {
    setText(text.toLowerCase());
    showalert("Converted to lowercase", "success");
  }
  const handleCapitalize = () => {
    showalert("Capitalized", "success");
    setText(
      text
        .split(/\s+/)
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    );
  }
  const handleClear = () => {
    setText("");
    showalert("Text cleard!", "success");
  }
  const handleRemoveSpaces = () => {
    setText(text.replace(/\s+/g, " ").trim());
    showalert("Removed all extra spaces from text!", "success");
  }
  const handleReverse = () => {
    setText(text.split("").reverse().join(""));
    showalert("Reversed the text!", "success");
  }

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    document.getSelection().removeAllRanges();
    setCopyStatus("✅ Copied!");
    setTimeout(() => setCopyStatus(""), 1500);
    showalert("Text copied!", "success");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey) {
        if (e.key === "u") {
          e.preventDefault();
          handleUppercase();
        }
        if (e.key === "l") {
          e.preventDefault();
          handleLowercase();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  // Word count
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  // Dynamic styles based on mode
  const darkBg = { backgroundColor: "#121212", color: "#fff" };
  const lightBg = { backgroundColor: "#ffffff", color: "#000" };
  const sectionStyle = mode === "dark" ? darkBg : lightBg;
  const inputStyle = {
    backgroundColor: mode === "dark" ? "#1e1e1e" : "#fff",
    color: mode === "dark" ? "#fff" : "#000",
    border: mode === "dark" ? "1px solid #555" : "1px solid #ccc",
  };

  return (
    <div className="container my-5">
      {/* LOGIN FORM */}
      {!isLoggedIn && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form
              onSubmit={handleLogin}
              className="p-4 border rounded shadow-sm"
              style={sectionStyle}
            >
              <h3 className="mb-4 text-center">🔐 Login to Continue</h3>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  style={inputStyle}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3" style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-control"
                    style={inputStyle}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    style={{
                      backgroundColor: mode === "dark" ? "#333" : "#f8f9fa",
                      color: mode === "dark" ? "#fff" : "#000",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <button className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      )}

      {/* TEXT TOOLS */}
      {isLoggedIn && (
        <div className="p-4 border rounded shadow-sm" style={sectionStyle}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">{heading}</h2>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <textarea
            className="form-control mb-3"
            id="myBox"
            rows="6"
            value={text}
            onChange={handleChange}
            placeholder="✍️ Type or paste your text here..."
            style={inputStyle}
          ></textarea>

          {/* ACTION BUTTONS */}
          <div className="mb-3 d-flex flex-wrap gap-2">
            <button className="btn btn-primary" onClick={handleUppercase} disabled={!text}>
              UPPERCASE
            </button>
            <button className="btn btn-primary" onClick={handleLowercase} disabled={!text}>
              lowercase
            </button>
            <button className="btn btn-primary" onClick={handleCapitalize} disabled={!text}>
              Capitalize Words
            </button>
            <button className="btn btn-primary" onClick={handleRemoveSpaces} disabled={!text}>
              Remove Extra Spaces
            </button>
            <button className="btn btn-primary" onClick={handleReverse} disabled={!text}>
              Reverse Text
            </button>
            <button className="btn btn-success" onClick={handleCopy} disabled={!text}>
              Copy Text
            </button>
            <button className="btn btn-danger" onClick={handleClear} disabled={!text}>
              Clear
            </button>
            {copyStatus && <span className="ms-2 text-success">{copyStatus}</span>}
          </div>

          {/* SUMMARY */}
          <div>
            <h4>📊 Summary</h4>
            <p>
              <b>{wordCount}</b> {wordCount === 1 ? "word" : "words"} |{" "}
              <b>{text.split(" ").filter((e)=>{return e.length !== 0}).length}</b> characters
            </p>
            <p>
              ⏱ Estimated Read Time:{" "}
              <b>{(0.008 * wordCount).toFixed(2)} minutes</b>
            </p>
          </div>

          {/* PREVIEW */}
          <div>
            <h4>👀 Preview</h4>
            <div
              className="p-3 border rounded"
              style={{
                backgroundColor: mode === "dark" ? "black" : "white",
                color: mode === "dark" ? "white" : "black",
              }}
            >
              {text || (
                <span className="text" style={{ fontSize: "1.2rem", color: mode === "dark" ? "white" : "black", }}>
                  Nothing to preview !
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
