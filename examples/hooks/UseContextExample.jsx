import React, { createContext, useContext, useState } from "react";

// Step 1: Create Context
const ThemeContext = createContext(null);

// Custom hook for using theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// Step 2: Create Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  const value = {
    theme,
    setTheme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Step 3: Consumer Components
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{
      background: theme === "light" ? "#fff" : "#333",
      color: theme === "light" ? "#000" : "#fff",
      padding: "20px",
      borderBottom: "2px solid " + (theme === "light" ? "#333" : "#fff")
    }}>
      <h1>useContext Example</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </header>
  );
}

function Content() {
  const { theme } = useTheme();

  return (
    <div style={{
      background: theme === "light" ? "#f0f0f0" : "#222",
      color: theme === "light" ? "#000" : "#fff",
      padding: "20px",
      minHeight: "200px"
    }}>
      <h2>Main Content</h2>
      <p>Current theme: <strong>{theme}</strong></p>
      <p>This component can access the theme context without prop drilling!</p>
    </div>
  );
}

function Footer() {
  const { theme } = useTheme();

  return (
    <footer style={{
      background: theme === "light" ? "#ddd" : "#111",
      color: theme === "light" ? "#000" : "#fff",
      padding: "20px",
      textAlign: "center"
    }}>
      <p>Footer - Current theme: {theme}</p>
    </footer>
  );
}

// Main App Component
function UseContextExample() {
  return (
    <ThemeProvider>
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        <Header />
        <Content />
        <Footer />
        
        <div style={{ padding: "20px", background: "#ffeb3b" }}>
          <h3>How it works:</h3>
          <ol>
            <li>ThemeContext is created with <code>createContext()</code></li>
            <li>ThemeProvider wraps all components</li>
            <li>Any child component can use <code>useTheme()</code> hook</li>
            <li>No need to pass props through every level!</li>
          </ol>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default UseContextExample;
