import React from "react";

function EventHandlingExample() {
  // Basic click handler
  function handleClick() {
    alert("You clicked me!");
  }

  // Handler with parameter
  function greet(name) {
    alert(`Hello, ${name}!`);
  }

  // Event object handler
  function handleInputChange(event) {
    console.log("Input value:", event.target.value);
    console.log("Input name:", event.target.name);
  }

  // Mouse event handler
  function handleMouseOver() {
    console.log("Mouse is over the element!");
  }

  // Form submit handler
  function handleSubmit(event) {
    event.preventDefault(); // Prevent page reload
    alert("Form submitted!");
  }

  // Keyboard event handler
  function handleKeyDown(event) {
    console.log("Key pressed:", event.key);
    if (event.key === "Enter") {
      alert("You pressed Enter!");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Event Handling Examples</h1>

      {/* onClick */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#f0f0f0" }}>
        <h2>1. onClick Event</h2>
        <button onClick={handleClick}>Click Me</button>
        <button onClick={() => alert("Inline alert!")} style={{ marginLeft: "5px" }}>
          Inline Handler
        </button>
      </div>

      {/* onClick with parameters */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#e8f4f8" }}>
        <h2>2. onClick with Parameters</h2>
        <button onClick={() => greet("Tejasvini")}>Greet Tejasvini</button>
        <button onClick={() => greet("Ashish")} style={{ marginLeft: "5px" }}>Greet Ashish</button>
      </div>

      {/* onChange */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#fff3e0" }}>
        <h2>3. onChange Event (check console)</h2>
        <input 
          type="text"
          name="username"
          onChange={handleInputChange}
          placeholder="Type something..."
          style={{ padding: "5px", fontSize: "16px" }}
        />
      </div>

      {/* onMouseOver / onMouseMove */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#f3e5f5" }}>
        <h2>4. onMouseMove Event (check console)</h2>
        <div 
          onMouseMove={handleMouseOver}
          style={{ 
            border: "2px solid purple",
            padding: "20px",
            textAlign: "center",
            background: "#f0f0f0"
          }}
        >
          Move your mouse over me!
        </div>
      </div>

      {/* onSubmit */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#c8e6c9" }}>
        <h2>5. onSubmit Event</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Username"
            style={{ padding: "5px", marginRight: "5px" }}
          />
          <input 
            type="password" 
            placeholder="Password"
            style={{ padding: "5px", marginRight: "5px" }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* onKeyDown */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#ffccbc" }}>
        <h2>6. onKeyDown Event (check console)</h2>
        <input 
          type="text"
          onKeyDown={handleKeyDown}
          placeholder="Press Enter..."
          style={{ padding: "5px", fontSize: "16px" }}
        />
      </div>

      {/* Common Event Types */}
      <div style={{ padding: "15px", background: "#ffeb3b" }}>
        <h2>Common React Events</h2>
        <ul>
          <li><code>onClick</code> - When element is clicked</li>
          <li><code>onChange</code> - When input value changes</li>
          <li><code>onSubmit</code> - When form is submitted</li>
          <li><code>onMouseOver / onMouseMove</code> - Mouse movement</li>
          <li><code>onKeyDown / onKeyUp</code> - Keyboard events</li>
          <li><code>onFocus / onBlur</code> - Element focus events</li>
        </ul>
        
        <h3 style={{ marginTop: "20px" }}>Important Rules:</h3>
        <ul>
          <li>✅ Use camelCase: <code>onClick</code>, not <code>onclick</code></li>
          <li>✅ Pass function reference: <code>onClick={"{handleClick}"}</code></li>
          <li>❌ Don't call immediately: <code>onClick={"{handleClick()}"}</code></li>
          <li>✅ Use arrow function for parameters: <code>onClick={"() => greet('name')"}</code></li>
        </ul>
      </div>
    </div>
  );
}

export default EventHandlingExample;
