# 📚 React Learning Notes

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

*A comprehensive guide to React concepts, hooks, and best practices*

[📖 Getting Started](#-getting-started) • [📂 Contents](#-contents) • [💡 Examples](#-examples) • [🤝 Contributing](#-contributing)

</div>

---

## 🎯 About This Repository

This repository contains well-organized notes and practical examples covering fundamental to advanced React concepts. Whether you're a beginner or looking to refresh your React knowledge, you'll find clear explanations and working code examples here.

## ✨ What You'll Learn

- 🧩 **Component-Based Architecture** - Building reusable UI components
- 🎣 **React Hooks** - useState, useEffect, useContext, useRef and more
- 🔄 **State Management** - Local state, lifting state, Context API, and Redux
- 🎨 **JSX** - Writing HTML-like syntax in JavaScript
- 🚀 **React Router** - Building single-page applications
- 🎪 **Event Handling** - Managing user interactions
- 🎭 **Conditional Rendering** - Displaying dynamic content

## 📂 Contents

### 📘 Documentation
- [01. Introduction to React](docs/01-introduction.md)
- [02. JSX Basics](docs/02-jsx.md)
- [03. Components & Props](docs/03-components-props.md)
- [04. React Hooks](docs/04-hooks.md)
- [05. State Lifting](docs/05-state-lifting.md)
- [06. Conditional Rendering](docs/06-conditional-rendering.md)
- [07. Event Handling](docs/07-event-handling.md)
- [08. useEffect Hook](docs/08-useEffect.md)
- [09. useContext Hook](docs/09-useContext.md)
- [10. React Router](docs/10-react-router.md)
- [11. React Redux](docs/11-redux.md)
- [12. useRef Hook](docs/12-useRef.md)
- [13. Libraries & Frameworks](docs/13-libraries-frameworks.md)

### 💻 Code Examples

#### Basics
- [Props Example](examples/basics/PropsExample.jsx)
- [JSX Example](examples/basics/JSXExample.jsx)

#### Hooks
- [useState Example](examples/hooks/UseStateExample.jsx)
- [useEffect Example](examples/hooks/UseEffectExample.jsx)
- [useContext Example](examples/hooks/UseContextExample.jsx)
- [useRef Example](examples/hooks/UseRefExample.jsx)

#### Advanced Concepts
- [State Lifting](examples/basics/StateLiftingExample.jsx)
- [Event Handling](examples/events/EventHandlingExample.jsx)
- [Event Bubbling](examples/events/EventBubblingExample.jsx)
- [Conditional Rendering](examples/basics/ConditionalRenderingExample.jsx)

## 🚀 Getting Started

### Prerequisites
```bash
Node.js (v14 or higher)
npm or yarn
```

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/react-notes.git

# Navigate to the project
cd react-notes

# Install dependencies (if you want to run examples)
npm install
```

## 💡 Examples

Each concept includes practical, working examples. Here's a quick preview:

### useState Hook
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Props Example
```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Greeting name="hlo" />
      <Greeting name="hyy" />
    </div>
  );
}
```

## 📖 Key Concepts Summary

### 🔹 Why React?
1. **Component-Based Architecture** - Build encapsulated components
2. **Reusable Components** - Write once, use everywhere
3. **Virtual DOM** - Fast and efficient UI updates
4. **SPA Support** - Dynamic updates without page reload
5. **State Management** - Manage data between components
6. **Props** - Pass data between components
7. **Hooks** - Add state and lifecycle features to functional components

### 🔹 Library vs Framework
- **Library (React)**: You call the library's functions when you need them
- **Framework (Angular)**: The framework calls your code and dictates structure

## 🛠️ Topics Covered

| Topic | Description | Example |
|-------|-------------|---------|
| JSX | JavaScript XML syntax | ✅ |
| Props | Passing data to components | ✅ |
| useState | State management | ✅ |
| useEffect | Side effects & lifecycle | ✅ |
| useContext | Global state management | ✅ |
| useRef | DOM references & persistent values | ✅ |
| State Lifting | Share state between components | ✅ |
| Event Handling | User interactions | ✅ |
| Conditional Rendering | Dynamic content display | ✅ |
| React Router | Navigation in SPAs | ✅ |
| Redux | Advanced state management | ✅ |

## 📚 Additional Resources

- [Official React Documentation](https://react.dev/)
- [React Hooks Documentation](https://react.dev/reference/react)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)

## 📝 License

This project is open source and available for educational purposes.

## 👤 Author

**Tejasvini Malviya**

---

<div align="center">

Made with ❤️ for React learners

⭐ Star this repo if you find it helpful!

</div>
