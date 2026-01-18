# 📘 Components & Props

## What are Components?

**Components** are the building blocks of a React application. Think of them as reusable pieces of UI that you can use multiple times throughout your app.

### Component = Function

In modern React, a component is simply a **JavaScript function** that returns JSX.

```jsx
function Welcome() {
  return <h1>Hello, World!</h1>;
}
```

## 🎯 Types of Components

### 1. **Functional Components** (Recommended)
Modern React uses functional components with hooks.

```jsx
function Greeting() {
  return <h1>Hello from a functional component!</h1>;
}
```

### 2. **Class Components** (Older Approach)
Still supported but not commonly used in new projects.

```jsx
class Greeting extends React.Component {
  render() {
    return <h1>Hello from a class component!</h1>;
  }
}
```

> 💡 **Best Practice**: Use functional components for all new code.

## 📦 What are Props?

**Props** (short for "properties") are how you pass data from one component to another. They work like **function arguments**.

### Key Characteristics of Props:

1. **Props are like arguments** - You pass them to components
2. **Props are read-only** - Child components cannot modify them
3. **Props flow downward** - From parent to child (one-way data flow)
4. **Props are objects** - All props are stored in a single object

## 🎨 Using Props

### Basic Props Example

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}

export default App;
```

**Output:**
```
Hello, Alice!
Hello, Bob!
```

### Destructuring Props (Cleaner Approach)

```jsx
// Instead of using props.name, props.age
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
    </div>
  );
}

// You can destructure for cleaner code
function UserCard({ name, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}
```

### Multiple Props

```jsx
function Profile({ name, age, city, occupation }) {
  return (
    <div className="profile">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
      <p>Job: {occupation}</p>
    </div>
  );
}

// Using the component
<Profile 
  name="Alex" 
  age={25} 
  city="Mumbai" 
  occupation="Developer" 
/>
```

## 👶 Children Props

The `children` prop is special. It refers to any content placed **between** the opening and closing tags of a component.

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// Using the Card component
function App() {
  return (
    <Card>
      <h2>This is a title</h2>
      <p>This is some content inside the card</p>
    </Card>
  );
}
```

In this example, everything between `<Card>` and `</Card>` is passed as `children`.

## 🔒 Props are Read-Only

**Important**: Child components cannot change the props they receive.

```jsx
function Greeting({ name }) {
  // ❌ This is WRONG - never modify props
  // name = "New Name";
  
  // ✅ This is correct - just use them
  return <h1>Hello, {name}!</h1>;
}
```

If you need to change data, use **state** instead of props.

## 📊 Types of Data You Can Pass as Props

```jsx
function Example() {
  return (
    <MyComponent
      // String
      name="Alex"
      
      // Number (use curly braces)
      age={25}
      
      // Boolean
      isActive={true}
      
      // Array
      hobbies={['coding', 'reading', 'music']}
      
      // Object
      user={{ name: 'User', role: 'Developer' }}
      
      // Function
      onClick={() => alert('Clicked!')}
    />
  );
}
```

## 🎯 Real-World Example

```jsx
// Product component
function Product({ name, price, image, inStock }) {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      {inStock ? (
        <button>Add to Cart</button>
      ) : (
        <p style={{ color: 'red' }}>Out of Stock</p>
      )}
    </div>
  );
}

// Using the Product component
function Shop() {
  return (
    <div>
      <Product 
        name="Laptop" 
        price={999} 
        image="/laptop.jpg"
        inStock={true}
      />
      <Product 
        name="Phone" 
        price={599} 
        image="/phone.jpg"
        inStock={false}
      />
    </div>
  );
}
```

## 🌟 Default Props

You can set default values for props:

```jsx
function Greeting({ name = "Guest" }) {
  return <h1>Hello, {name}!</h1>;
}

// If no name is provided, it will use "Guest"
<Greeting /> // Output: Hello, Guest!
<Greeting name="User" /> // Output: Hello, User!
```

## 🔄 Props Flow Diagram

```
Parent Component (App)
    |
    | props = { name: "User", age: 25 }
    |
    ↓
Child Component (Profile)
    |
    | Receives props as an object
    | Cannot modify props
    |
    ↓
Displays: "Hello Teju, you are 25 years old"
```

## ✅ Props Best Practices

1. **Use descriptive prop names** - `userName` instead of `n`
2. **Destructure props** - Makes code cleaner and easier to read
3. **Set default values** - Prevent undefined errors
4. **Don't modify props** - They are read-only
5. **Keep props simple** - Don't pass too many props to one component
6. **Use PropTypes** - For type checking (optional but recommended)

## 🎓 Summary

| Concept | Description |
|---------|-------------|
| **Component** | A reusable piece of UI (just a function) |
| **Props** | Data passed from parent to child component |
| **Direction** | Props flow from parent to child (one-way) |
| **Immutability** | Props cannot be modified by the child |
| **Children** | Special prop for content between component tags |
| **Purpose** | Share data and make components reusable |

### Quick Recap:
- Components are functions that return JSX
- Props are like function arguments
- Props are read-only (immutable)
- Props flow from parent to child
- Use props to make components reusable and dynamic

---

**Previous:** [← JSX Basics](02-jsx.md) | **Next:** [React Hooks →](04-hooks.md)
