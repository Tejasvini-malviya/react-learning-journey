# 📘 React Router

## What is React Router?

**React Router** is a library that enables navigation between different pages/views in a React application without reloading the page. It makes building **Single Page Applications (SPAs)** easy!

### Why React Router?

- Navigate between pages without page refresh
- Browser back/forward buttons work correctly
- URL changes reflect current page
- Can pass data through URLs
- Supports nested routes

## 📦 Installation

```bash
npm install react-router-dom
```

## 🎯 Core Concepts

| Component | Purpose |
|-----------|---------|
| `BrowserRouter` | Wraps your entire app, enables routing |
| `Routes` | Container for all Route components |
| `Route` | Defines a path and what component to show |
| `Link` | Navigate without page reload (like `<a>`) |
| `useNavigate` | Navigate programmatically |
| `useParams` | Get URL parameters |

## 📝 Basic Setup

### App.jsx
```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      {/* Navigation Links */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Route Definitions */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Pages

**Home.jsx**
```jsx
function Home() {
  return <h1>Home Page</h1>;
}

export default Home;
```

**About.jsx**
```jsx
function About() {
  return <h1>About Page</h1>;
}

export default About;
```

## 🔗 Navigation

### Using Link Component

```jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      {/* ❌ Don't use <a> - causes page reload */}
      <a href="/about">About</a>
      
      {/* ✅ Use <Link> - no page reload */}
      <Link to="/about">About</Link>
    </nav>
  );
}
```

### Using useNavigate Hook (Programmatic Navigation)

```jsx
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Do login logic
    // Then navigate to dashboard
    navigate('/dashboard');
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

## 🎯 URL Parameters

### Dynamic Routes

```jsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/user/:id" element={<UserProfile />} />
      <Route path="/product/:productId" element={<ProductPage />} />
    </Routes>
  );
}
```

### Accessing Parameters with useParams

```jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams(); // Get the :id from URL

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {id}</p>
    </div>
  );
}

// URL: /user/123 → id = "123"
// URL: /user/456 → id = "456"
```

## 🎨 Complete Example with Navigation

```jsx
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// Main App
function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '20px', background: '#f0f0f0' }}>
        <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
        <Link to="/products" style={{ margin: '0 10px' }}>Products</Link>
        <Link to="/about" style={{ margin: '0 10px' }}>About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Home Page
function Home() {
  return <h1>Welcome Home!</h1>;
}

// Product List
function ProductList() {
  const products = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Phone' },
    { id: 3, name: 'Tablet' }
  ];

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Product Detail
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
      <button onClick={() => navigate('/products')}>
        Back to Products
      </button>
    </div>
  );
}

// About Page
function About() {
  return <h1>About Us</h1>;
}

// 404 Page
function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

export default App;
```

## 🎯 Nested Routes

```jsx
function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      
      {/* Child routes render here */}
      <Outlet />
    </div>
  );
}
```

## 🔍 Query Parameters

```jsx
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q');    // Get ?q=value
  const page = searchParams.get('page');  // Get ?page=value

  return (
    <div>
      <p>Search: {query}</p>
      <p>Page: {page}</p>
      
      <button onClick={() => setSearchParams({ q: 'react', page: '2' })}>
        Update Search
      </button>
    </div>
  );
}

// URL: /search?q=react&page=1
// query = "react"
// page = "1"
```

## 🛡️ Protected Routes

```jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

## 📋 Common Patterns

### Active Link Styling

```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink 
        to="/"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Home
      </NavLink>
      
      <NavLink 
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'black'
        })}
      >
        About
      </NavLink>
    </nav>
  );
}
```

### Navigate with State

```jsx
import { useNavigate, useLocation } from 'react-router-dom';

// Sending state
function ProductList() {
  const navigate = useNavigate();
  
  const goToProduct = (product) => {
    navigate(`/product/${product.id}`, { 
      state: { productName: product.name }
    });
  };
  
  return <button onClick={() => goToProduct(product)}>View</button>;
}

// Receiving state
function ProductDetail() {
  const location = useLocation();
  const productName = location.state?.productName;
  
  return <h1>{productName}</h1>;
}
```

## ✅ Best Practices

1. **Always use BrowserRouter** at the root of your app
2. **Use Link/NavLink** instead of `<a>` tags
3. **Use useNavigate** for programmatic navigation
4. **Define 404 route** with `path="*"`
5. **Keep routes organized** in a separate file for large apps
6. **Use nested routes** for better structure

## 🎓 Summary

| Hook/Component | Purpose |
|----------------|---------|
| `BrowserRouter` | Enable routing in app |
| `Routes` | Container for routes |
| `Route` | Define path and component |
| `Link` | Navigate (like `<a>`) |
| `useNavigate` | Navigate programmatically |
| `useParams` | Get URL parameters `:id` |
| `useSearchParams` | Get query params `?q=value` |
| `useLocation` | Get current location |
| `Navigate` | Redirect component |
| `Outlet` | Render nested routes |

### Key Points:
- React Router enables SPA navigation
- Use `<Link>` for navigation, not `<a>`
- `useParams()` for dynamic URLs
- `useNavigate()` for programmatic navigation
- Wrap app in `<BrowserRouter>`

---

**Previous:** [← useContext Hook](09-useContext.md) | **Next:** [React Redux →](11-redux.md)
