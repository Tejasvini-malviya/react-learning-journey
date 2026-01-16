# 📘 JSX - JavaScript XML

## What is JSX?

**JSX** stands for **JavaScript XML**. It's a syntax that allows you to write HTML-like code inside JavaScript. JSX makes it easier to create and visualize your UI components.

## 🎯 Key Points

- JSX looks like HTML, but it's actually JavaScript
- You can write JavaScript expressions inside JSX using curly braces `{}`
- JSX is not valid JavaScript by itself - it needs to be converted

## 🔄 How JSX Works

```
JSX Code → React Code → HTML → Browser Renders
```

### Step-by-step Process:

1. **You write JSX**
   ```jsx
   const element = <h1>Hello, World!</h1>;
   ```

2. **JSX is converted to React code** (by Babel)
   ```javascript
   const element = React.createElement('h1', null, 'Hello, World!');
   ```

3. **React code becomes HTML**
   ```html
   <h1>Hello, World!</h1>
   ```

4. **Browser renders the HTML**

## ✍️ JSX Examples

### Basic JSX
```jsx
const greeting = <h1>Hello, React!</h1>;
```

### JSX with JavaScript Expressions
```jsx
const name = "Tejasvini";
const greeting = <h1>Hello, {name}!</h1>;
```

### JSX with Multiple Elements
```jsx
const element = (
  <div>
    <h1>Welcome to React</h1>
    <p>This is a paragraph</p>
  </div>
);
```

### JSX with Dynamic Content
```jsx
const user = {
  firstName: 'Tejasvini',
  lastName: 'Malviya'
};

const element = (
  <h1>
    Hello, {user.firstName} {user.lastName}!
  </h1>
);
```

## 📝 JSX Rules

### 1. **Must Return a Single Parent Element**
```jsx
// ❌ Wrong - Multiple parent elements
return (
  <h1>Title</h1>
  <p>Paragraph</p>
);

// ✅ Correct - Wrapped in single parent
return (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
);

// ✅ Also Correct - Using Fragment
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);
```

### 2. **Use className Instead of class**
```jsx
// ❌ Wrong
<div class="container">Hello</div>

// ✅ Correct
<div className="container">Hello</div>
```

### 3. **Close All Tags**
```jsx
// ❌ Wrong
<img src="photo.jpg">
<input type="text">

// ✅ Correct
<img src="photo.jpg" />
<input type="text" />
```

### 4. **Use Camel Case for Attributes**
```jsx
// ❌ Wrong
<button onclick={handleClick}>Click</button>

// ✅ Correct
<button onClick={handleClick}>Click</button>
```

## 🎨 JSX with Styling

### Inline Styles
```jsx
const divStyle = {
  color: 'blue',
  backgroundColor: 'lightgray',
  padding: '10px'
};

const element = <div style={divStyle}>Styled Text</div>;
```

### Using CSS Classes
```jsx
const element = <div className="my-class">Styled with CSS</div>;
```

## 🔍 JSX vs HTML Differences

| HTML | JSX | Reason |
|------|-----|--------|
| `class` | `className` | `class` is a reserved keyword in JavaScript |
| `for` | `htmlFor` | `for` is a reserved keyword in JavaScript |
| `onclick` | `onClick` | JSX uses camelCase |
| `tabindex` | `tabIndex` | JSX uses camelCase |

## 💡 JSX Best Practices

1. **Keep it readable** - Use proper indentation
2. **Use fragments** - Avoid unnecessary div wrappers
3. **Extract complex JSX** - Create separate components for complex UI
4. **Use meaningful names** - Name your components clearly

## 🎯 Common JSX Patterns

### Conditional Rendering
```jsx
const isLoggedIn = true;

const element = (
  <div>
    {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>}
  </div>
);
```

### Rendering Lists
```jsx
const numbers = [1, 2, 3, 4, 5];

const listItems = (
  <ul>
    {numbers.map((number) => (
      <li key={number}>{number}</li>
    ))}
  </ul>
);
```

### Embedding Expressions
```jsx
const count = 5;
const element = <p>You have {count * 2} items</p>;
// Output: You have 10 items
```

## 🚫 What You Cannot Do in JSX

```jsx
// ❌ Cannot use if-else directly
<div>
  if (condition) {
    <h1>Title</h1>
  }
</div>

// ✅ Use ternary operator instead
<div>
  {condition ? <h1>Title</h1> : <p>Alternative</p>}
</div>

// ❌ Cannot use for loops directly
<div>
  for (let i = 0; i < 5; i++) {
    <p>Item</p>
  }
</div>

// ✅ Use map instead
<div>
  {[1, 2, 3, 4, 5].map(i => <p key={i}>Item</p>)}
</div>
```

## 🎓 Summary

- JSX = JavaScript + XML
- Allows you to write HTML-like code in JavaScript
- Makes React code more readable and intuitive
- Gets converted to regular JavaScript before running in the browser
- Must follow specific rules (single parent, className, camelCase, etc.)

---

**Previous:** [← Introduction](01-introduction.md) | **Next:** [Components & Props →](03-components-props.md)
