import React from "react";

// Example of basic JSX usage
function JSXExample() {
  const name = "Tejasvini";
  const user = {
    firstName: "Tejasvini",
    lastName: "Malviya"
  };

  return (
    <div>
      <h1>JSX Examples</h1>
      
      {/* Basic text */}
      <p>Hello, React!</p>
      
      {/* JavaScript expression in JSX */}
      <p>Hello, {name}!</p>
      
      {/* Object properties */}
      <p>Full Name: {user.firstName} {user.lastName}</p>
      
      {/* Math operations */}
      <p>2 + 2 = {2 + 2}</p>
      
      {/* Conditional rendering with ternary */}
      <p>Status: {true ? "Active" : "Inactive"}</p>
      
      {/* Inline styling */}
      <div style={{ color: "blue", backgroundColor: "lightgray", padding: "10px" }}>
        Styled with inline CSS
      </div>
      
      {/* className instead of class */}
      <div className="my-class">This uses a CSS class</div>
      
      {/* Self-closing tags */}
      <img src="/image.jpg" alt="Example" />
      <input type="text" placeholder="Enter text" />
      
      {/* Rendering a list */}
      <ul>
        {[1, 2, 3, 4, 5].map((number) => (
          <li key={number}>Item {number}</li>
        ))}
      </ul>
    </div>
  );
}

export default JSXExample;
