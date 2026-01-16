import React from "react";

export default function EventBubblingExample() {
  const handleGrandparentClick = () => {
    console.log("3. Grandparent clicked (outer div)");
  };

  const handleParentClick = () => {
    console.log("2. Parent clicked (middle div)");
  };

  const handleChildClick = () => {
    console.log("1. Child clicked (button)");
  };

  const handleChildClickWithStop = (event) => {
    event.stopPropagation(); // Stop bubbling!
    console.log("Button clicked - Stopped propagation!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Event Bubbling Examples</h1>

      {/* Example 1: Event Bubbling in Action */}
      <div style={{ marginBottom: "30px" }}>
        <h2>1. Event Bubbling (Check Console)</h2>
        <p>Click the button and see the console - all three handlers fire!</p>
        
        <div 
          onClick={handleGrandparentClick}
          style={{ 
            padding: "30px", 
            background: "#ffebee",
            border: "2px solid red"
          }}
        >
          Grandparent Div
          
          <div 
            onClick={handleParentClick}
            style={{ 
              padding: "20px", 
              background: "#fff3e0",
              border: "2px solid orange",
              margin: "10px"
            }}
          >
            Parent Div
            
            <button 
              onClick={handleChildClick}
              style={{ 
                padding: "10px 20px",
                background: "#4caf50",
                color: "white",
                border: "none",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Click Me (Child Button)
            </button>
          </div>
        </div>
      </div>

      {/* Example 2: Stopping Propagation */}
      <div style={{ marginBottom: "30px" }}>
        <h2>2. Stopping Event Bubbling</h2>
        <p>Click the button - only the button's handler fires!</p>
        
        <div 
          onClick={() => console.log("Outer div clicked")}
          style={{ 
            padding: "30px", 
            background: "#e3f2fd",
            border: "2px solid blue"
          }}
        >
          Outer Div (Click me or the button)
          
          <button 
            onClick={handleChildClickWithStop}
            style={{ 
              padding: "10px 20px",
              background: "#2196f3",
              color: "white",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              margin: "10px"
            }}
          >
            Click Me (Stops Propagation)
          </button>
        </div>
      </div>

      {/* Example 3: Practical Use Case - Modal */}
      <div style={{ marginBottom: "30px" }}>
        <h2>3. Practical Example: Modal</h2>
        <p>Click gray area to "close", click white box - nothing happens</p>
        
        <div 
          onClick={() => alert("Modal closed!")}
          style={{ 
            background: "rgba(0,0,0,0.5)",
            padding: "50px",
            borderRadius: "5px"
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              background: "white",
              padding: "30px",
              borderRadius: "5px",
              textAlign: "center"
            }}
          >
            <h3>Modal Content</h3>
            <p>Clicking here won't close the modal</p>
            <button onClick={() => alert("Button clicked!")}>
              Click Me
            </button>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div style={{ padding: "15px", background: "#fff9c4" }}>
        <h2>How Event Bubbling Works</h2>
        
        <pre style={{ background: "#f0f0f0", padding: "10px", overflow: "auto" }}>
{`User clicks Button
      ↓
Button onClick fires
      ↓
Parent Div onClick fires  ← Event bubbles up
      ↓
Grandparent onClick fires ← Keeps bubbling
      ↓
Document`}
        </pre>

        <h3 style={{ marginTop: "20px" }}>How to Stop Bubbling:</h3>
        <code style={{ background: "#f0f0f0", padding: "5px", display: "block" }}>
          event.stopPropagation();
        </code>

        <h3 style={{ marginTop: "20px" }}>Common Use Cases:</h3>
        <ul>
          <li>Modal/Dialog - Close on overlay click, not on content click</li>
          <li>Dropdown menus - Close on outside click</li>
          <li>Cards with buttons - Button click shouldn't trigger card click</li>
          <li>Nested clickable elements</li>
        </ul>

        <h3 style={{ marginTop: "20px" }}>Remember:</h3>
        <ul>
          <li><code>event.stopPropagation()</code> - Stops event bubbling</li>
          <li><code>event.preventDefault()</code> - Stops default behavior (different!)</li>
        </ul>
      </div>
    </div>
  );
}
