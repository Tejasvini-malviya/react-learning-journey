# 📘 Event Bubbling

## What is Event Bubbling?

**Event bubbling** is a behavior in the DOM where an event triggered on a child element automatically **propagates (bubbles) up** to its parent elements.

### Simple Explanation:

When you click a button inside a div:
1. The button's click event fires first
2. Then the event "bubbles up" to the div
3. Then to the div's parent, and so on, all the way up to the document

It's like ripples in water spreading outward! 🌊

## 🎯 How Event Bubbling Works

```
User clicks Button
      ↓
Button onClick fires
      ↓
Div onClick fires      ← Event bubbles up
      ↓
Parent Div onClick     ← Keeps bubbling
      ↓
Body onClick
      ↓
Document
```

## 📝 Example of Event Bubbling

```jsx
import React from "react";

export default function App() {
  return (
    <div
      onClick={() => console.log("Div clicked")}
      style={{ padding: 20, background: "lightblue" }}
    >
      <button onClick={() => console.log("Button clicked")}>
        Click Me
      </button>
    </div>
  );
}
```

### What Happens When You Click the Button?

**Console Output:**
```
Button clicked
Div clicked        ← Event bubbled up!
```

Even though you only clicked the button, **both** event handlers run because the event bubbles from the button to the div.

## 🛑 How to Stop Event Bubbling

Use `event.stopPropagation()` to prevent the event from bubbling up to parent elements.

### Example: Stopping Bubbling

```jsx
export default function App() {
  return (
    <div
      onClick={() => console.log("Div clicked")}
      style={{ padding: 20, background: "lightblue" }}
    >
      <button
        onClick={(event) => {
          event.stopPropagation(); // ← Stops bubbling!
          console.log("Button clicked");
        }}
      >
        Click Me
      </button>
    </div>
  );
}
```

### What Happens Now?

**Console Output:**
```
Button clicked
```

The div's `onClick` doesn't fire because we stopped the event from bubbling up!

## 🎯 Practical Examples

### Example 1: Modal Dialog

```jsx
function Modal({ onClose }) {
  return (
    <div 
      className="modal-overlay"
      onClick={onClose} // Close when clicking outside
      style={{ background: "rgba(0,0,0,0.5)", padding: "50px" }}
    >
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Don't close when clicking inside
        style={{ background: "white", padding: "20px" }}
      >
        <h2>Modal Title</h2>
        <p>Modal content here</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
```

**How it works:**
- Clicking the **overlay** (gray area) closes the modal
- Clicking **inside the modal** doesn't close it (stopPropagation)
- Clicking the **close button** closes it

### Example 2: Nested List Items

```jsx
function NestedList() {
  const handleListClick = () => {
    console.log("List clicked");
  };

  const handleItemClick = (item, event) => {
    event.stopPropagation(); // Prevent list click
    console.log(`${item} clicked`);
  };

  return (
    <ul onClick={handleListClick} style={{ border: "1px solid black", padding: "10px" }}>
      <li onClick={(e) => handleItemClick("Item 1", e)}>Item 1</li>
      <li onClick={(e) => handleItemClick("Item 2", e)}>Item 2</li>
      <li onClick={(e) => handleItemClick("Item 3", e)}>Item 3</li>
    </ul>
  );
}
```

**Result:**
- Clicking an **item** logs only the item (not the list)
- Clicking the **list** (white space) logs "List clicked"

### Example 3: Card with Delete Button

```jsx
function ProductCard({ product, onCardClick, onDelete }) {
  return (
    <div 
      className="card"
      onClick={() => onCardClick(product)}
      style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
    >
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      
      <button
        onClick={(e) => {
          e.stopPropagation(); // Don't trigger card click
          onDelete(product.id);
        }}
        style={{ background: "red", color: "white" }}
      >
        Delete
      </button>
    </div>
  );
}
```

**Behavior:**
- Clicking the **card** opens product details
- Clicking **delete button** only deletes (doesn't open details)

## 🔄 Event Bubbling vs Event Capturing

| Phase | Direction | Description |
|-------|-----------|-------------|
| **Capturing** | Top → Bottom | Event travels down from document to target |
| **Target** | At Element | Event reaches the actual element clicked |
| **Bubbling** | Bottom → Top | Event bubbles up from target to document |

### Visual Representation:

```
Document
  └─ Body
      └─ Div
          └─ Button (clicked)

Capturing Phase: Document → Body → Div → Button
Bubbling Phase:  Button → Div → Body → Document
```

## ⚙️ Event Capturing (Less Common)

You can listen during the capturing phase by using `onClickCapture`:

```jsx
<div onClickCapture={() => console.log("Div - Capturing")}>
  <button onClick={() => console.log("Button - Bubbling")}>
    Click Me
  </button>
</div>
```

**Output when button is clicked:**
```
Div - Capturing     ← Fires during capture phase
Button - Bubbling   ← Fires during bubbling phase
```

## 🎯 When to Stop Propagation

### ✅ Stop propagation when:
- Modal/dialog overlays (click outside to close)
- Nested clickable elements (card with buttons)
- Custom dropdowns or menus
- Preventing parent handlers from interfering

### ❌ Don't stop propagation when:
- Analytics tracking (you want all clicks recorded)
- Accessibility features depend on it
- You're not sure if parent needs the event

## 📋 Common Methods

| Method | Purpose |
|--------|---------|
| `event.stopPropagation()` | Stop event from bubbling to parents |
| `event.preventDefault()` | Prevent default browser behavior |
| `event.stopImmediatePropagation()` | Stop all other handlers on same element |

### Example Using Both:

```jsx
function LinkButton({ href, onClick }) {
  const handleClick = (event) => {
    event.preventDefault();      // Don't follow the link
    event.stopPropagation();     // Don't bubble to parent
    onClick();                   // Run custom handler
  };

  return <a href={href} onClick={handleClick}>Click me</a>;
}
```

## ⚠️ Common Mistakes

### 1. Forgetting to Stop Propagation

```jsx
// ❌ Problem: Both handlers fire
<div onClick={handleDivClick}>
  <button onClick={handleButtonClick}>Delete</button>
</div>

// ✅ Solution: Stop propagation
<div onClick={handleDivClick}>
  <button onClick={(e) => {
    e.stopPropagation();
    handleButtonClick();
  }}>Delete</button>
</div>
```

### 2. Confusing preventDefault and stopPropagation

```jsx
// preventDefault() - Stops default browser behavior
<a href="/page" onClick={(e) => e.preventDefault()}>
  {/* Link won't navigate */}
</a>

// stopPropagation() - Stops event bubbling
<div onClick={handleDiv}>
  <button onClick={(e) => e.stopPropagation()}>
    {/* Won't trigger handleDiv */}
  </button>
</div>
```

## 🎓 Summary

| Concept | Description |
|---------|-------------|
| **Event Bubbling** | Events propagate from child to parent elements |
| **stopPropagation()** | Prevents event from bubbling to parents |
| **preventDefault()** | Stops default browser behavior |
| **Event Capturing** | Events travel from parent to child (less common) |
| **Use Case** | Nested clickable elements, modals, dropdowns |

### Key Takeaways:
- Events bubble up from child to parent by default
- Use `e.stopPropagation()` to prevent bubbling
- Common in modals, nested buttons, and cards
- Don't confuse with `e.preventDefault()` (different purpose)

---

**Next:** [useContext Hook →](09-useContext.md)
