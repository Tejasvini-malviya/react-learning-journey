# 📘 Event Handling

## What is Event Handling?

**Event handling** is how you respond to user interactions in React. Events are actions like clicking a button, typing in an input, hovering over an element, or submitting a form.

## 🎯 Common Events

- `onClick` - When user clicks an element
- `onChange` - When input value changes
- `onSubmit` - When form is submitted
- `onMouseOver` / `onMouseMove` - When mouse moves over element
- `onMouseOut` - When mouse leaves element
- `onKeyDown` / `onKeyUp` - When keyboard key is pressed/released
- `onFocus` / `onBlur` - When element gets/loses focus

## 📝 Basic Event Handling

### Syntax

In React, event handlers are:
- Written in **camelCase** (not lowercase like HTML)
- Passed as **functions** (not strings)

```jsx
// ❌ HTML way
<button onclick="handleClick()">Click</button>

// ✅ React way
<button onClick={handleClick}>Click</button>
```

### Simple Example

```jsx
import React from "react";

function App() {
  function handleClick() {
    alert("You clicked me!");
  }

  return (
    <div>
      <button onClick={handleClick}>
        <h1>Click Me</h1>
      </button>
    </div>
  );
}

export default App;
```

## 🖱️ Different Event Examples

### onClick Event

```jsx
function ClickExample() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

### onMouseOver / onMouseMove Event

```jsx
function MouseExample() {
  function handleMouseOver() {
    alert("Why are you here!");
  }

  return (
    <p 
      onMouseMove={handleMouseOver}
      style={{ border: "1px solid black", padding: "20px" }}
    >
      Hover over me
    </p>
  );
}
```

### onChange Event (for inputs)

```jsx
function InputExample() {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        value={text}
        onChange={handleChange}
      />
      <p>You typed: {text}</p>
    </div>
  );
}
```

### onSubmit Event (for forms)

```jsx
function FormExample() {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    alert("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 🎯 Passing Arguments to Event Handlers

### Method 1: Arrow Function (Immediate Invocation)

```jsx
function App() {
  const greet = (name) => {
    alert(`Hello, ${name}!`);
  };

  return (
    <div>
      {/* ❌ Wrong - calls immediately */}
      <button onClick={greet("Teju")}>Click</button>
      
      {/* ✅ Correct - wraps in arrow function */}
      <button onClick={() => greet("Teju")}>Click</button>
    </div>
  );
}
```

### Method 2: Inline Arrow Function

```jsx
function App() {
  return (
    <button onClick={() => alert("Button clicked!")}>
      Click Me
    </button>
  );
}
```

### Method 3: Bind Method (Less Common)

```jsx
function App() {
  const greet = (name) => {
    alert(`Hello, ${name}!`);
  };

  return (
    <button onClick={greet.bind(null, "Teju")}>
      Click Me
    </button>
  );
}
```

## ⚡ The Event Object

Every event handler receives an **event object** with information about the event.

```jsx
function EventObjectExample() {
  const handleClick = (event) => {
    console.log("Event type:", event.type);        // "click"
    console.log("Target element:", event.target);  // The element clicked
    console.log("Mouse position:", event.clientX, event.clientY);
  };

  return <button onClick={handleClick}>Click to see event details</button>;
}
```

### Common Event Object Properties

```jsx
function InputEventExample() {
  const handleChange = (event) => {
    console.log("Value:", event.target.value);     // Current input value
    console.log("Name:", event.target.name);       // Input name attribute
    console.log("Type:", event.target.type);       // Input type (text, email, etc.)
  };

  return (
    <input 
      type="text"
      name="username"
      onChange={handleChange}
    />
  );
}
```

## 🎯 Practical Examples

### Example 1: Toggle Visibility

```jsx
import React, { useState } from "react";

function ToggleExample() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? "Hide" : "Show"} Text
      </button>
      
      {isVisible && <p>This text can be hidden!</p>}
    </div>
  );
}
```

### Example 2: Counter with Multiple Buttons

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Example 3: Form Handling

```jsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    
    console.log("Email:", email);
    console.log("Password:", password);
    
    // Here you would typically send data to server
    alert(`Logging in with ${email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Example 4: Keyboard Events

```jsx
function KeyboardExample() {
  const [key, setKey] = useState("");

  const handleKeyDown = (event) => {
    setKey(event.key);
    
    if (event.key === "Enter") {
      alert("Enter key pressed!");
    }
  };

  return (
    <div>
      <input 
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Press any key"
      />
      <p>Last key pressed: {key}</p>
    </div>
  );
}
```

## ⚠️ Common Mistakes

### 1. Calling Function Immediately

```jsx
// ❌ Wrong - function is called immediately
<button onClick={handleClick()}>Click</button>

// ✅ Correct - pass function reference
<button onClick={handleClick}>Click</button>

// ✅ Also correct - arrow function wrapper
<button onClick={() => handleClick()}>Click</button>
```

### 2. Forgetting event.preventDefault()

```jsx
// ❌ Form will reload the page
function Form() {
  const handleSubmit = (e) => {
    console.log("Submitted");
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}

// ✅ Prevent default behavior
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault(); // ← Important!
    console.log("Submitted");
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

## 📋 Event Handler Naming Conventions

```jsx
// ✅ Good naming conventions
onClick={handleClick}
onChange={handleChange}
onSubmit={handleSubmit}
onMouseOver={handleMouseOver}

// ✅ Or use 'on' prefix
onClick={onClick}
onChange={onChange}

// ❌ Avoid unclear names
onClick={func1}
onChange={doStuff}
```

## 🎓 Summary

| Concept | Description |
|---------|-------------|
| **Event** | User interaction (click, type, hover, etc.) |
| **Handler** | Function that runs when event occurs |
| **camelCase** | React events use camelCase (onClick, not onclick) |
| **Function Reference** | Pass function, don't call it: `onClick={handleClick}` |
| **Event Object** | Contains info about the event: `event.target.value` |
| **preventDefault()** | Stops default behavior (like form submission) |

### Key Rules:
1. ✅ Use camelCase for event names (`onClick`, `onChange`)
2. ✅ Pass function reference, not a call (`onClick={handleClick}` not `onClick={handleClick()}`)
3. ✅ Use arrow functions to pass arguments: `onClick={() => handleClick(id)}`
4. ✅ Use `event.preventDefault()` to stop default behavior
5. ✅ Access event details via the event object

---

**Previous:** [← Conditional Rendering](06-conditional-rendering.md) | **Next:** [useEffect Hook →](08-useEffect.md)
