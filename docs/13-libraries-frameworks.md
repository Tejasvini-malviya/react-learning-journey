# 📘 Libraries & Frameworks

## Library vs Framework

### 🔹 Library
A **library** is a collection of pre-written code (functions/tools) that **you call** when you need specific functionality.

**Characteristics:**
- **You are in control** - You decide when and how to use it
- **Flexibility** - Pick and choose what you need
- **Lightweight** - Use only what you need
- **Examples**: React, Lodash, Axios

**Analogy**: A library is like a **toolbox** - you pick the tools you need for your project.

### 🔹 Framework
A **framework** is a complete structure that **calls your code**. It dictates how your application should be organized.

**Characteristics:**
- **Framework is in control** - You fill in the pieces it asks for
- **Structure enforced** - You must follow its rules and patterns
- **All-in-one** - Includes everything you need
- **Examples**: Angular, Next.js, Vue.js

**Analogy**: A framework is like a **pre-built house** - you furnish the rooms, but the structure is already decided.

## 📊 Comparison Table

| Aspect | Library (React) | Framework (Angular) |
|--------|----------------|-------------------|
| **Control** | You call the library | Framework calls your code |
| **Flexibility** | High - choose your tools | Low - must follow rules |
| **Learning Curve** | Easier | Steeper |
| **Structure** | You decide | Pre-determined |
| **Size** | Smaller | Larger |
| **Examples** | Routing? Choose React Router | Routing built-in |

## 📚 Popular React Libraries

### 1️⃣ Animation - GSAP

**GSAP (GreenSock Animation Platform)** is a powerful JavaScript animation library for creating smooth, professional animations.

#### What it does:
- Create smooth animations
- Animate any property (position, scale, rotation, color)
- Timeline-based animations
- ScrollTrigger for scroll-based animations

#### Installation:
```bash
npm install gsap
```

#### Basic Example:
```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function AnimatedBox() {
  const boxRef = useRef(null);

  useEffect(() => {
    // Animate the box
    gsap.to(boxRef.current, {
      x: 300,           // Move 300px to the right
      rotation: 360,    // Rotate 360 degrees
      duration: 2,      // Animation takes 2 seconds
      ease: 'bounce'    // Bounce easing
    });
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        width: '100px',
        height: '100px',
        background: 'blue'
      }}
    />
  );
}
```

#### Timeline Example:
```jsx
useEffect(() => {
  const tl = gsap.timeline();
  
  tl.to('.box1', { x: 200, duration: 1 })
    .to('.box2', { y: 200, duration: 1 })
    .to('.box3', { rotation: 360, duration: 1 });
}, []);
```

### 2️⃣ Smooth Scrolling - Lenis

**Lenis** is a lightweight library that provides buttery-smooth scrolling with momentum and easing.

#### What it does:
- Smooth scroll experience
- Custom scroll speed
- Momentum scrolling
- Works great with GSAP ScrollTrigger

#### Installation:
```bash
npm install @studio-freight/lenis
```

#### Basic Example:
```jsx
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,    // Scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true
    });

    // Animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      {/* Your content */}
    </div>
  );
}
```

### 3️⃣ Other Popular Libraries

| Library | Purpose | Installation |
|---------|---------|--------------|
| **Axios** | HTTP requests | `npm install axios` |
| **React Query** | Data fetching & caching | `npm install @tanstack/react-query` |
| **Framer Motion** | Animations | `npm install framer-motion` |
| **React Hook Form** | Form handling | `npm install react-hook-form` |
| **Zustand** | State management | `npm install zustand` |
| **React Icons** | Icon library | `npm install react-icons` |
| **date-fns** | Date utilities | `npm install date-fns` |
| **Chart.js** | Charts & graphs | `npm install chart.js react-chartjs-2` |

## 🏗️ Popular React Frameworks

### 1️⃣ Next.js (Most Popular)

**Next.js** is a React framework for building production-ready web applications with server-side rendering, static site generation, and more.

#### Features:
- **Server-Side Rendering (SSR)**
- **Static Site Generation (SSG)**
- **File-based routing** - Create files in `/pages` folder
- **API routes** - Build backend endpoints
- **Image optimization**
- **Built-in CSS support**

#### When to use:
✅ SEO is important  
✅ Need server-side rendering  
✅ Building a full-stack app  
✅ Want best performance  

#### Installation:
```bash
npx create-next-app@latest my-app
```

#### Example:
```jsx
// pages/index.js - Automatically becomes the home page!
export default function Home() {
  return <h1>Welcome to Next.js!</h1>;
}

// pages/about.js - Automatically becomes /about page!
export default function About() {
  return <h1>About Page</h1>;
}
```

### 2️⃣ Angular

**Angular** is a complete framework by Google for building web applications.

#### Features:
- **TypeScript-based**
- **Two-way data binding**
- **Dependency injection**
- **Complete ecosystem** (routing, forms, HTTP, etc.)
- **CLI tools**

#### When to use:
✅ Large enterprise applications  
✅ Team prefers TypeScript  
✅ Want everything included  
✅ Need strong structure  

### 3️⃣ Vue.js

**Vue** is a progressive framework for building user interfaces.

#### Features:
- **Easy to learn**
- **Component-based**
- **Reactive data binding**
- **Single-file components**

#### When to use:
✅ Want something between React and Angular  
✅ Gradual adoption  
✅ Easier learning curve  

## 🎯 Build Tools

### Vite (Modern & Fast)

**Vite** is a modern build tool and bundler that's extremely fast.

#### Features:
- **Lightning-fast HMR** (Hot Module Replacement)
- **Instant server start**
- **Optimized builds**
- **Plugin ecosystem**

#### Create React app with Vite:
```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

## 📦 When to Use What?

### Use a Library when:
- Small to medium projects
- Need flexibility
- Want to choose your own tools
- Learning or experimenting

### Use a Framework when:
- Large applications
- Need structure and conventions
- Team collaboration
- Enterprise projects

## 🎓 Summary

### Library (React):
- ✅ You're in control
- ✅ Pick and choose features
- ✅ More flexibility
- ✅ Smaller learning curve
- ❌ Need to choose additional tools (routing, state management)

### Framework (Next.js, Angular):
- ✅ Everything included
- ✅ Strong structure
- ✅ Best practices enforced
- ✅ Great for large teams
- ❌ Less flexibility
- ❌ Steeper learning curve

### Popular Combinations:

**Simple React App:**
```
React + React Router + Context API + Axios
```

**Medium React App:**
```
React + React Router + Redux Toolkit + React Query + GSAP
```

**Production App:**
```
Next.js + TypeScript + Tailwind CSS + React Query + Zustand
```

### Quick Reference:

| Need | Use This |
|------|----------|
| Animations | GSAP or Framer Motion |
| Smooth Scroll | Lenis |
| Forms | React Hook Form |
| Data Fetching | React Query or Axios |
| State Management | Redux Toolkit or Zustand |
| Icons | React Icons |
| Charts | Chart.js |
| Full Framework | Next.js |

---

**Previous:** [← useRef Hook](12-useRef.md) | **[Back to README](../README.md)**
