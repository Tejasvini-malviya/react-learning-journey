import React, { useState } from "react";

function UseStateExample() {
  // Basic counter
  const [count, setCount] = useState(0);
  
  // String state
  const [name, setName] = useState('');
  
  // Boolean state
  const [isVisible, setIsVisible] = useState(true);
  
  // Object state
  const [user, setUser] = useState({
    name: '',
    age: 0,
    email: ''
  });

  // Array state
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Update object state
  const handleUserChange = (field, value) => {
    setUser({
      ...user,
      [field]: value
    });
  };

  // Add item to array
  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  // Remove item from array
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>useState Hook Examples</h1>

      {/* Counter Example */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#f0f0f0" }}>
        <h2>1. Counter</h2>
        <p style={{ fontSize: "24px" }}>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)} style={{ marginLeft: "5px" }}>Decrement</button>
        <button onClick={() => setCount(0)} style={{ marginLeft: "5px" }}>Reset</button>
      </div>

      {/* String State */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#e8f4f8" }}>
        <h2>2. String State</h2>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{ padding: "5px", fontSize: "16px" }}
        />
        <p>Hello, {name || "Guest"}!</p>
      </div>

      {/* Boolean State */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#fff3e0" }}>
        <h2>3. Toggle Visibility</h2>
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "Hide" : "Show"} Content
        </button>
        {isVisible && (
          <p style={{ marginTop: "10px", padding: "10px", background: "yellow" }}>
            This content can be hidden!
          </p>
        )}
      </div>

      {/* Object State */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#f3e5f5" }}>
        <h2>4. Object State</h2>
        <div>
          <input 
            type="text"
            value={user.name}
            onChange={(e) => handleUserChange('name', e.target.value)}
            placeholder="Name"
            style={{ margin: "5px", padding: "5px" }}
          />
          <input 
            type="number"
            value={user.age}
            onChange={(e) => handleUserChange('age', e.target.value)}
            placeholder="Age"
            style={{ margin: "5px", padding: "5px" }}
          />
          <input 
            type="email"
            value={user.email}
            onChange={(e) => handleUserChange('email', e.target.value)}
            placeholder="Email"
            style={{ margin: "5px", padding: "5px" }}
          />
        </div>
        <div style={{ marginTop: "10px", padding: "10px", background: "#fff" }}>
          <p><strong>Name:</strong> {user.name || "Not set"}</p>
          <p><strong>Age:</strong> {user.age || "Not set"}</p>
          <p><strong>Email:</strong> {user.email || "Not set"}</p>
        </div>
      </div>

      {/* Array State */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#c8e6c9" }}>
        <h2>5. Array State (Todo List)</h2>
        <div>
          <input 
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
            style={{ padding: "5px", fontSize: "16px" }}
          />
          <button onClick={addItem} style={{ marginLeft: "5px" }}>Add</button>
        </div>
        <ul>
          {items.map((item, index) => (
            <li key={index} style={{ margin: "5px 0" }}>
              {item}
              <button 
                onClick={() => removeItem(index)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        {items.length === 0 && <p style={{ color: "#666" }}>No items yet</p>}
      </div>
    </div>
  );
}

export default UseStateExample;
