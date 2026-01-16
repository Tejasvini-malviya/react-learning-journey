# 📘 React Hooks

## What are Hooks?

**Hooks** are special functions provided by React that let you use React features in functional components. Before hooks, you needed class components to use state and lifecycle methods. Now, hooks make functional components powerful!

### Why Hooks?

- Use state in functional components
- Handle side effects (like data fetching, subscriptions)
- Access React features without writing classes
- Make code cleaner and more reusable

## 🎣 Common React Hooks

1. **useState** - Manage state
2. **useEffect** - Handle side effects
3. **useContext** - Access context data
4. **useRef** - Reference DOM elements or persist values
5. **useReducer** - Advanced state management
6. **useMemo** - Optimize performance
7. **useCallback** - Optimize function references

---

## 1️⃣ useState Hook

### What is it?

`useState` lets you add **state** to your functional components. State is data that can change over time.

### Syntax

```jsx
const [stateVariable, setStateFunction] = useState(initialValue);
```

- **stateVariable** - The current state value
- **setStateFunction** - Function to update the state
- **initialValue** - The starting value of the state

### Basic Example

```jsx
import React, { useState } from 'react';

function Counter() {
  // Declare a state variable called 'count' with initial value 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

export default Counter;
```

### Multiple State Variables

```jsx
function UserProfile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input 
        value={age} 
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        type="number"
      />
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
    </div>
  );
}
```

### State with Objects

```jsx
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    age: 0,
    email: ''
  });

  const handleChange = (field, value) => {
    setUser({
      ...user,  // Keep existing properties
      [field]: value  // Update specific field
    });
  };

  return (
    <div>
      <input 
        value={user.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
    </div>
  );
}
```

### Key Points about useState

✅ **Each component has its own state** - State is local to the component  
✅ **State updates trigger re-renders** - Component re-renders when state changes  
✅ **Don't modify state directly** - Always use the setter function  
✅ **State updates are asynchronous** - Changes don't happen immediately  

### ❌ Wrong Way

```jsx
// Don't do this!
count = count + 1;  // ❌ Never modify state directly
```

### ✅ Correct Way

```jsx
setCount(count + 1);  // ✅ Always use the setter function
```

---

## 2️⃣ useEffect Hook

### What is it?

`useEffect` lets you perform **side effects** in functional components. Side effects include:
- Fetching data from an API
- Setting up subscriptions
- Manually changing the DOM
- Setting up timers

### When does it run?

- **After** the component renders
- Can run on every render, or only when specific values change
- Can run only once (when component mounts)

### Syntax

```jsx
useEffect(() => {
  // Code to run (side effect)
  
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```

### Example 1: Run on Every Render

```jsx
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // Runs after every render
  useEffect(() => {
    console.log('Component rendered!');
    console.log('Count is:', count);
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Example 2: Run Only Once (On Mount)

```jsx
function DataFetcher() {
  const [data, setData] = useState(null);

  // Empty dependency array [] means run only once
  useEffect(() => {
    console.log('Component mounted!');
    
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []); // ← Empty array = run once

  return <div>{data ? data.title : 'Loading...'}</div>;
}
```

### Example 3: Run When Specific Value Changes

```jsx
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  // Runs only when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      console.log('Searching for:', searchTerm);
      // Fetch search results
    }
  }, [searchTerm]); // ← Only runs when searchTerm changes

  return (
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
```

### Example 4: Cleanup Function

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Start timer
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup function - runs when component unmounts
    return () => {
      clearInterval(interval);
      console.log('Timer cleaned up!');
    };
  }, []);

  return <p>Seconds: {seconds}</p>;
}
```

### useEffect Dependency Array Explained

| Dependency Array | When Effect Runs | Use Case |
|-----------------|------------------|----------|
| No array | After every render | Logging, always sync with DOM |
| `[]` (empty) | Only once (on mount) | API calls, subscriptions |
| `[value]` | When `value` changes | Search, filtering, derived data |

### Key Points about useEffect

✅ **Runs after render** - Not before  
✅ **Use cleanup** - For timers, subscriptions, listeners  
✅ **Dependency array** - Controls when effect runs  
✅ **Multiple effects** - You can have multiple useEffect calls  

### Common useEffect Patterns

```jsx
// Document title update
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);

// Window resize listener
useEffect(() => {
  const handleResize = () => {
    console.log('Window resized');
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => window.removeEventListener('resize', handleResize);
}, []);

// API data fetching
useEffect(() => {
  async function fetchData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  }
  
  fetchData();
}, []);
```

---

## 🎓 Summary

### useState
- Add state to functional components
- Returns [value, setter] pair
- Each setState triggers a re-render
- Use multiple useState for different pieces of state

### useEffect
- Handle side effects after rendering
- Replaces componentDidMount, componentDidUpdate, componentWillUnmount
- Control when it runs using dependency array
- Use cleanup function for subscriptions/timers

---

**Previous:** [← Components & Props](03-components-props.md) | **Next:** [State Lifting →](05-state-lifting.md)
