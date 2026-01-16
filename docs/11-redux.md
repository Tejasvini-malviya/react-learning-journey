# 📘 React Redux

## What is Redux?

**Redux** is a state management library for JavaScript applications. It helps you manage **global application state** in a predictable way, especially useful for large applications with complex state.

### Why Redux?

- Centralized state management
- Predictable state updates
- Easy debugging with DevTools
- Time-travel debugging
- Great for large applications

## 🎯 Core Concepts

| Term | Description |
|------|-------------|
| **Store** | Single source of truth - holds entire app state |
| **Action** | Plain object describing what happened (an event) |
| **Reducer** | Pure function that takes state + action, returns new state |
| **Slice** | Feature-specific state + reducers (Redux Toolkit concept) |
| **Dispatch** | Function to send actions to the store |

### Think of it Like:

```
🏪 Store = Bank (holds all money/data)
📝 Action = Transaction Request (deposit, withdraw)
⚙️ Reducer = Bank Teller (processes the request)
📊 State = Your Balance (current data)
```

## 🔄 Redux Flow

```
User clicks button
      ↓
Dispatch Action
      ↓
Reducer processes Action
      ↓
Store updates State
      ↓
UI re-renders with new State
```

## 📦 Installation (Redux Toolkit - Recommended)

```bash
npm install @reduxjs/toolkit react-redux
```

> **Note**: Redux Toolkit is the modern, recommended way to use Redux. It simplifies setup significantly!

## 📝 Basic Setup with Redux Toolkit

### Step 1: Create a Slice

A **slice** is a collection of Redux logic for a single feature.

**counterSlice.js**
```jsx
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
      state.value += 1;  // Redux Toolkit allows "mutations"!
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    }
  }
});

// Export actions
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
```

### Step 2: Create the Store

**store.js**
```jsx
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    // Add more reducers here
    // user: userReducer,
    // products: productsReducer,
  }
});

export default store;
```

### Step 3: Provide the Store to React

**main.jsx** or **index.js**
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### Step 4: Use Redux State in Components

**Counter.jsx**
```jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, reset } from './counterSlice';

function Counter() {
  // Get state from Redux store
  const count = useSelector((state) => state.counter.value);
  
  // Get dispatch function
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      
      <button onClick={() => dispatch(increment())}>
        +1
      </button>
      
      <button onClick={() => dispatch(decrement())}>
        -1
      </button>
      
      <button onClick={() => dispatch(incrementByAmount(5))}>
        +5
      </button>
      
      <button onClick={() => dispatch(reset())}>
        Reset
      </button>
    </div>
  );
}

export default Counter;
```

## 🎯 Understanding Each Part

### 1️⃣ Action

An action is a plain JavaScript object that describes what happened.

```jsx
// Action object structure
{
  type: 'counter/increment',   // What happened
  payload: 5                   // Additional data (optional)
}
```

With Redux Toolkit, you don't create these manually:
```jsx
dispatch(increment());           // Creates: { type: 'counter/increment' }
dispatch(incrementByAmount(5));  // Creates: { type: 'counter/incrementByAmount', payload: 5 }
```

### 2️⃣ Reducer

A pure function that takes current state and action, returns new state.

```jsx
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/increment':
      return { value: state.value + 1 };
    case 'counter/decrement':
      return { value: state.value - 1 };
    default:
      return state;
  }
}
```

Redux Toolkit simplifies this:
```jsx
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;  // Looks like mutation, but it's safe!
    }
  }
});
```

### 3️⃣ Store

The central place holding all your state.

```jsx
const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  }
});

// State structure:
{
  counter: { value: 0 },
  user: { name: 'Tejasvini', loggedIn: true }
}
```

### 4️⃣ Slice

A feature-specific collection of state, reducers, and actions.

```jsx
// One slice per feature
counterSlice → manages counter state
userSlice → manages user state
todoSlice → manages todos state
```

## 🎨 Real-World Example: Todo App

**todoSlice.js**
```jsx
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter(t => t.id !== action.payload);
    }
  }
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

**TodoList.jsx**
```jsx
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './todoSlice';
import { useState } from 'react';

function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput('');
    }
  };

  return (
    <div>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 🎯 Redux Hooks

| Hook | Purpose |
|------|---------|
| `useSelector` | Read state from Redux store |
| `useDispatch` | Get dispatch function to send actions |

### useSelector Example
```jsx
// Get specific data from state
const count = useSelector((state) => state.counter.value);
const user = useSelector((state) => state.user);
const todos = useSelector((state) => state.todos);
```

### useDispatch Example
```jsx
const dispatch = useDispatch();

// Dispatch actions
dispatch(increment());
dispatch(addTodo('Learn Redux'));
dispatch(login({ email: 'user@example.com' }));
```

## 📊 Redux vs Context API

| Feature | Context API | Redux |
|---------|-------------|-------|
| **Complexity** | Simple | More complex |
| **Best For** | Theme, Auth, small apps | Large apps, complex state |
| **DevTools** | No | Yes (time-travel debugging) |
| **Middleware** | No | Yes |
| **Performance** | Can cause re-renders | Optimized |
| **Boilerplate** | Less | More (but Redux Toolkit helps) |

## ✅ When to Use Redux

### ✅ Use Redux when:
- App has lots of global state
- State is updated in many places
- You need time-travel debugging
- Multiple components need same state
- Large team working on complex app

### ❌ Don't use Redux when:
- Small app with little state
- State is mostly local to components
- Simple parent-child data passing
- Context API is sufficient

## 🎓 Summary

### Key Concepts:

| Term | Simple Explanation |
|------|-------------------|
| **Action** | "What happened?" - An event description |
| **Reducer** | "How to update?" - Logic to change state |
| **Store** | "Where is data?" - Central state container |
| **Slice** | "Feature logic" - State + reducers for one feature |
| **Dispatch** | "Trigger update" - Send action to store |

### Redux Flow:
1. User clicks → `dispatch(action)`
2. Action goes to → `Reducer`
3. Reducer updates → `State in Store`
4. Components re-render → with new data

### Modern Redux (Redux Toolkit):
- ✅ Use `createSlice()` - simpler than old way
- ✅ Use `configureStore()` - auto setup
- ✅ "Mutation" syntax works - Immer handles it
- ✅ Less boilerplate - more productive

---

**Previous:** [← React Router](10-react-router.md) | **Next:** [useRef Hook →](12-useRef.md)
