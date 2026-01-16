# 📘 State Lifting

## What is State Lifting?

**State lifting** is a pattern where you move state from a child component **up** to a parent component. This allows multiple components to share and synchronize the same data.

## 🎯 Why Lift State?

### The Problem:
Imagine you have two sibling components that need to share data:
- Component A needs to display some data
- Component B needs to update that same data
- They are siblings (not parent-child)

### The Solution:
**Lift the state up** to their common parent!

```
Before (Problem):                After (Solution):
ComponentA (has state)          Parent (has state)
ComponentB (needs same data)    ├── ComponentA (receives state via props)
                                └── ComponentB (receives state via props)
```

## 🔄 How State Lifting Works

1. **Move state to parent** - The parent becomes the "single source of truth"
2. **Pass state down** - Parent gives the state to children via props
3. **Pass updater function down** - Children can request state updates
4. **Parent updates state** - All children automatically get the new data

## 📝 Complete Example

### Problem: Two Input Fields Need to Stay in Sync

```jsx
import React, { useState } from "react";

export default function App() {
  // State is in the parent
  const [text, setText] = useState('');

  // Function to update state
  function handleInputChange(event) {
    setText(event.target.value);
  }

  return (
    <div>
      <label>Input 1: </label>
      <MyInput 
        valueToShow={text}
        onType={handleInputChange}
      />
      <br /><br />
      
      <label>Input 2: </label>
      <MyInput 
        valueToShow={text}
        onType={handleInputChange}
      />
    </div>
  );
}

// Child component - doesn't have its own state
function MyInput({ onType, valueToShow }) {
  return (
    <input
      value={valueToShow}
      onChange={onType}
    />
  );
}
```

### What's Happening?

1. **Parent (App)** holds the state: `text`
2. **Parent** has the function to update it: `handleInputChange`
3. **Children (MyInput)** receive:
   - Current value via `valueToShow` prop
   - Update function via `onType` prop
4. When user types in **either** input:
   - Child calls `onType`
   - Parent updates `text`
   - Both inputs get the new value
   - Both inputs stay synchronized! ✨

## 🎯 Real-World Example: Temperature Converter

```jsx
import React, { useState } from "react";

function TemperatureApp() {
  const [temperature, setTemperature] = useState('');

  return (
    <div>
      <h2>Temperature Converter</h2>
      
      <TemperatureInput
        scale="Celsius"
        temperature={temperature}
        onTemperatureChange={setTemperature}
      />
      
      <TemperatureInput
        scale="Fahrenheit"
        temperature={temperature}
        onTemperatureChange={setTemperature}
      />
      
      <BoilingVerdict celsius={parseFloat(temperature)} />
    </div>
  );
}

function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  return (
    <fieldset>
      <legend>Enter temperature in {scale}:</legend>
      <input
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
      />
    </fieldset>
  );
}

function BoilingVerdict({ celsius }) {
  if (celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

## 📊 Data Flow Diagram

```
Parent Component (Single Source of Truth)
│
├─ state: text = "Hello"
├─ function: setText
│
├─→ Child 1
│   ├─ receives: text = "Hello"
│   ├─ receives: setText function
│   └─ displays: "Hello"
│
└─→ Child 2
    ├─ receives: text = "Hello"
    ├─ receives: setText function
    └─ displays: "Hello"

When Child 1 types "Hi":
├─ Child 1 calls setText("Hi")
├─ Parent updates: text = "Hi"
├─ Both children re-render
└─ Both show: "Hi"
```

## ✅ When to Lift State

Lift state when:
- ✅ Multiple components need the same data
- ✅ Components need to stay synchronized
- ✅ Sibling components need to communicate
- ✅ You need a single source of truth

Don't lift state when:
- ❌ Only one component needs the data
- ❌ Components are completely independent
- ❌ The data doesn't need to be shared

## 🎯 Best Practices

### 1. Lift State to the Closest Common Parent
```jsx
// Good - state in closest parent
<Parent>
  <Child1 />
  <Child2 />
</Parent>

// Avoid - state too high up
<GrandParent>
  <Parent>
    <Child1 />
    <Child2 />
  </Parent>
</GrandParent>
```

### 2. Keep State Minimal
Only lift what's necessary. If only two components need to share data, don't lift it higher than their common parent.

### 3. Name Props Clearly
```jsx
// Good
<Input value={text} onChange={handleTextChange} />

// Confusing
<Input val={text} fn={handleTextChange} />
```

### 4. One Source of Truth
Never duplicate state! If the parent has the state, children shouldn't have their own copy.

```jsx
// ❌ Bad - duplicated state
function Parent() {
  const [data, setData] = useState('');
  return <Child initialData={data} />;
}

function Child({ initialData }) {
  const [data, setData] = useState(initialData); // ❌ Duplicate!
  return <input value={data} onChange={...} />;
}

// ✅ Good - single source of truth
function Parent() {
  const [data, setData] = useState('');
  return <Child data={data} onChange={setData} />;
}

function Child({ data, onChange }) {
  return <input value={data} onChange={onChange} />;
}
```

## 🎓 Summary

| Concept | Description |
|---------|-------------|
| **State Lifting** | Moving state from child to parent |
| **Purpose** | Share state between sibling components |
| **Single Source of Truth** | Parent owns the state |
| **Props Down** | Parent passes state to children |
| **Events Up** | Children call parent's update function |
| **Benefits** | Synchronized data, easier to maintain |

### Remember:
- State lives in the parent
- Parent passes state down via props
- Parent passes update function down via props
- Children call the update function when needed
- This keeps all components in sync!

---

**Previous:** [← React Hooks](04-hooks.md) | **Next:** [Conditional Rendering →](06-conditional-rendering.md)
