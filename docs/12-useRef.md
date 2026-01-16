# 📘 useRef Hook

## What is useRef?

`useRef` is a React Hook that lets you **reference a value** that:
1. **Persists across re-renders** (doesn't reset like normal variables)
2. **Doesn't cause re-renders** when updated (unlike useState)
3. **Can access DOM elements directly**

## 🎯 Two Main Use Cases

### 1️⃣ Accessing DOM Elements
Directly manipulate DOM elements (focus inputs, scroll, measure size, etc.)

### 2️⃣ Storing Mutable Values
Keep values that persist across renders without causing re-renders

## 📝 Basic Syntax

```jsx
import { useRef } from 'react';

function MyComponent() {
  const myRef = useRef(initialValue);
  
  // Access the value
  console.log(myRef.current);
  
  // Update the value
  myRef.current = newValue;
}
```

## 🎯 Use Case 1: DOM Manipulation

### Example 1: Focus an Input

```jsx
import React, { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  const handleClick = () => {
    // Focus the input element
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Enter text" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

### Example 2: Scroll to Element

```jsx
function ScrollExample() {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <button onClick={scrollToSection}>Scroll to Section</button>
      
      <div style={{ height: '100vh' }}>Scroll down...</div>
      
      <div ref={sectionRef} style={{ background: 'yellow', padding: '20px' }}>
        <h2>Target Section</h2>
      </div>
    </div>
  );
}
```

### Example 3: Get Element Dimensions

```jsx
function MeasureElement() {
  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const measureElement = () => {
    if (divRef.current) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight
      });
    }
  };

  return (
    <div>
      <div ref={divRef} style={{ width: '200px', height: '100px', background: 'lightblue' }}>
        Measure me!
      </div>
      <button onClick={measureElement}>Get Dimensions</button>
      <p>Width: {dimensions.width}px, Height: {dimensions.height}px</p>
    </div>
  );
}
```

## 🎯 Use Case 2: Persisting Values

### Example 1: Count Renders (Without Causing Re-render)

```jsx
import { useRef, useState } from 'react';

function RenderCounter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  // Increment render count on every render
  renderCount.current += 1;

  return (
    <div>
      <p>State Count: {count}</p>
      <p>Render Count: {renderCount.current}</p>
      
      <button onClick={() => setCount(count + 1)}>
        Increment State
      </button>
    </div>
  );
}
```

**Why not useState?**
- If we used `useState` for renderCount, updating it would cause another re-render
- This would create an infinite loop!
- `useRef` doesn't cause re-renders ✅

### Example 2: Store Previous Value

```jsx
import { useRef, useState, useEffect } from 'react';

function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Example 3: Store Timer ID

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current) return; // Already running
    
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  return (
    <div>
      <h1>{seconds} seconds</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
```

## 📊 useRef vs useState

| Feature | useState | useRef |
|---------|----------|--------|
| **Triggers re-render** | ✅ Yes | ❌ No |
| **Persists across renders** | ✅ Yes | ✅ Yes |
| **When to use** | UI state that should re-render | Values that don't need to re-render |
| **Example** | Form inputs, toggles | Timers, previous values, DOM refs |

### Example Comparison:

```jsx
function Comparison() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);

  const incrementState = () => {
    setStateCount(stateCount + 1); // ✅ Re-renders component
  };

  const incrementRef = () => {
    refCount.current += 1; // ❌ Does NOT re-render
    console.log(refCount.current); // See value in console
  };

  return (
    <div>
      <p>State: {stateCount}</p>
      <p>Ref: {refCount.current}</p>
      
      <button onClick={incrementState}>Increment State</button>
      <button onClick={incrementRef}>Increment Ref (no re-render)</button>
    </div>
  );
}
```

## 🎨 Practical Examples

### Example 1: Form Input Focus on Error

```jsx
function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) {
      setError('Email required');
      emailRef.current.focus(); // Focus the email input
      return;
    }

    if (!password) {
      setError('Password required');
      passwordRef.current.focus(); // Focus the password input
      return;
    }

    // Submit form
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
```

### Example 2: Video Player Controls

```jsx
function VideoPlayer() {
  const videoRef = useRef(null);

  const play = () => {
    videoRef.current.play();
  };

  const pause = () => {
    videoRef.current.pause();
  };

  const restart = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  return (
    <div>
      <video ref={videoRef} width="400">
        <source src="video.mp4" type="video/mp4" />
      </video>
      
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={restart}>Restart</button>
      </div>
    </div>
  );
}
```

### Example 3: Click Outside to Close

```jsx
import { useRef, useEffect } from 'react';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle Dropdown
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
      )}
    </div>
  );
}
```

## ⚠️ Common Mistakes

### 1. Don't use ref.current in render

```jsx
// ❌ Wrong - reading during render
function Bad() {
  const ref = useRef(0);
  ref.current += 1;
  return <div>{ref.current}</div>; // Unpredictable
}

// ✅ Correct - read in event handler or effect
function Good() {
  const ref = useRef(0);
  
  const handleClick = () => {
    ref.current += 1;
    console.log(ref.current);
  };
  
  return <button onClick={handleClick}>Click</button>;
}
```

### 2. Don't forget to check if ref is null

```jsx
// ❌ Might crash if ref not set
const handleClick = () => {
  inputRef.current.focus(); // Error if inputRef.current is null
};

// ✅ Always check
const handleClick = () => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
};
```

## 🎓 Summary

| Use Case | Example |
|----------|---------|
| **DOM Access** | Focus inputs, scroll, measure elements |
| **Persist Value** | Timers, previous values, render count |
| **No Re-render** | Store data that doesn't need to trigger UI update |

### Key Points:
- `useRef` returns an object with a `.current` property
- Changing `.current` doesn't cause re-renders
- Perfect for DOM manipulation
- Perfect for storing values across renders
- Use `useState` for UI state, `useRef` for "background" values

### When to Use:
- ✅ Accessing DOM elements
- ✅ Storing timer IDs
- ✅ Keeping previous values
- ✅ Counting renders
- ✅ Storing any mutable value that doesn't need to trigger re-renders

### When NOT to Use:
- ❌ UI state that should re-render (use useState instead)
- ❌ Reading `.current` during render (causes inconsistency)

---

**Previous:** [← React Redux](11-redux.md) | **Next:** [Libraries & Frameworks →](13-libraries-frameworks.md)
