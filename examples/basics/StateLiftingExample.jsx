import React, { useState } from "react";

export default function StateLiftingExample() {
  // State is lifted to parent component
  const [text, setText] = useState('');

  // Handler function to update state
  function handleInputChange(event) {
    setText(event.target.value);
  }

  return (
    <div>
      <h1>State Lifting Example</h1>
      <p>Both inputs below are synchronized!</p>
      
      <div style={{ margin: "20px 0" }}>
        <label>Input 1: </label>
        <MyInput 
          valueToShow={text}
          onType={handleInputChange}
        />
      </div>
      
      <div style={{ margin: "20px 0" }}>
        <label>Input 2: </label>
        <MyInput 
          valueToShow={text}
          onType={handleInputChange}
        />
      </div>
      
      <div style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0" }}>
        <strong>Current Value:</strong> {text || "(empty)"}
      </div>
    </div>
  );
}

// Child component - doesn't manage its own state
function MyInput({ onType, valueToShow }) {
  return (
    <input
      value={valueToShow}
      onChange={onType}
      placeholder="Type something..."
      style={{ padding: "5px", fontSize: "16px" }}
    />
  );
}
