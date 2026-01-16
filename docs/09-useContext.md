# 📘 useContext Hook & Context API

## What is Context API?

The **Context API** is a way to share data across your entire app (or part of it) **without** passing props through every level. It creates **global state** that any component can access.

### The Problem Context Solves:

Without Context (Prop Drilling):
```
App (has theme data)
  └─ Header (doesn't need theme, but must pass it)
      └─ Navigation (doesn't need theme, but must pass it)
          └─ UserMenu (finally uses theme!)
```

With Context:
```
App (provides theme)
  └─ Header
      └─ Navigation
          └─ UserMenu (directly accesses theme!)
```

## 🎯 Context API vs useContext Hook

| Term | What It Does |
|------|--------------|
| **Context API** | System for creating and providing global state |
| **useContext Hook** | Hook for consuming/reading the global state |
| **Provider** | Component that makes data available to children |
| **Consumer** | Component that reads the data (uses useContext) |

Think of it as:
- **Context API** = The delivery system
- **Provider** = The warehouse that stores goods
- **useContext** = The customer picking up goods

## 📝 How to Use Context

### Step 1: Create a Context

```jsx
import { createContext } from "react";

// Create a context with a default value
export const ThemeContext = createContext("light");
```

### Step 2: Provide the Context

Wrap your components with a Provider and pass the value.

```jsx
import React, { useState } from "react";
import { ThemeContext } from "./ThemeContext";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div>
        <Header />
        <MainContent />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
```

### Step 3: Consume the Context

Use the `useContext` hook to access the data.

```jsx
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function MainContent() {
  // Access the context value
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div style={{ 
      background: theme === "light" ? "#fff" : "#333",
      color: theme === "light" ? "#000" : "#fff"
    }}>
      <h2>Current Theme: {theme}</h2>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}
```

## 🎨 Complete Example: Theme Switcher

### ThemeContext.js
```jsx
import { createContext } from "react";

// Create context with default value
export const ThemeContext = createContext("light");
```

### App.jsx (Provider)
```jsx
import React, { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import Child from "./Child";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="app">
        <h1>Theme Example</h1>
        <Child />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
```

### Child.jsx (Consumer)
```jsx
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Child() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div style={{ 
      background: theme === "light" ? "#fff" : "#333",
      color: theme === "light" ? "#000" : "#fff",
      padding: "20px"
    }}>
      <h2>Current Theme: {theme}</h2>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}

export default Child;
```

## 🎯 Real-World Example: User Authentication

### AuthContext.js
```jsx
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### App.jsx
```jsx
import { AuthProvider } from "./AuthContext";
import Dashboard from "./Dashboard";

function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}
```

### Dashboard.jsx
```jsx
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Dashboard() {
  const { user, login, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <button onClick={() => login({ name: "Tejasvini", role: "admin" })}>
        Login
      </button>
    );
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 📊 Context Flow Diagram

```
1. Create Context
   createContext() → ThemeContext

2. Provide Context
   <ThemeContext.Provider value={data}>
     └─ All children can access 'data'

3. Consume Context
   useContext(ThemeContext) → Get 'data'

Data Flow:
Provider (top) → useContext (anywhere below) → Access data
```

## 🎯 Multiple Contexts

You can use multiple contexts in one app:

```jsx
import { ThemeContext } from "./ThemeContext";
import { AuthContext } from "./AuthContext";
import { LanguageContext } from "./LanguageContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <YourApp />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

## 🎨 Context with Custom Hook

Create a custom hook for easier usage:

### ThemeContext.js
```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

// Custom Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  
  return context;
}
```

### Usage
```jsx
import { ThemeProvider, useTheme } from "./ThemeContext";

// In App
function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}

// In any component
function Page() {
  const { theme, toggleTheme } = useTheme(); // ← Cleaner!
  
  return (
    <div className={theme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## ✅ When to Use Context

### ✅ Good Use Cases:
- **Theme** (light/dark mode)
- **Authentication** (current user)
- **Language** (internationalization)
- **Global UI state** (sidebar open/closed)
- **User preferences**

### ❌ Don't Use Context For:
- **Frequently changing data** - Use Redux or Zustand instead
- **Local component state** - Use useState
- **Simple prop passing** - Just pass props!
- **Performance-critical data** - Context causes re-renders

## ⚠️ Performance Considerations

Context re-renders all consumers when value changes. Optimize by:

### 1. Split Contexts

```jsx
// ❌ Bad - one large context
<UserContext.Provider value={{ user, theme, settings, ... }}>

// ✅ Good - separate contexts
<UserContext.Provider>
  <ThemeContext.Provider>
    <SettingsContext.Provider>
```

### 2. Memoize Context Value

```jsx
import { useMemo } from "react";

function App() {
  const [theme, setTheme] = useState("light");
  
  // Memoize to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ theme, setTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## 🎓 Summary

| Concept | Purpose |
|---------|---------|
| **Context API** | Create global state |
| **createContext()** | Create a new context |
| **Provider** | Supply data to children |
| **useContext()** | Access context data |
| **Custom Hook** | Cleaner way to use context |

### Quick Comparison:

| Feature | Props | Context | Redux |
|---------|-------|---------|-------|
| Data Flow | Parent to Child | Provider to Any Descendant | Global Store |
| Complexity | Simple | Medium | Complex |
| Best For | Local data | Theme, Auth | App-wide state |

### Steps to Use Context:
1. **Create** context with `createContext()`
2. **Provide** value with `<Context.Provider value={...}>`
3. **Consume** value with `useContext(Context)`

---

**Previous:** [← Event Bubbling](08-event-bubbling.md) | **Next:** [React Router →](10-react-router.md)
