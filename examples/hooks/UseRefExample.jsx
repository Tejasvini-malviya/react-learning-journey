import React, { useRef, useState, useEffect } from "react";

function UseRefExample() {
  // Example 1: Focus input
  const inputRef = useRef(null);

  // Example 2: Count renders without causing re-render
  const renderCount = useRef(0);

  // Example 3: Store previous value
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  // Example 4: Timer
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Example 5: Scroll to element
  const sectionRef = useRef(null);

  // Update render count
  useEffect(() => {
    renderCount.current += 1;
  });

  // Store previous count value
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const focusInput = () => {
    inputRef.current.focus();
  };

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>useRef Hook Examples</h1>

      {/* Example 1: Focus Input */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#f0f0f0" }}>
        <h2>1. Focus Input (DOM Manipulation)</h2>
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Click button to focus me"
          style={{ padding: "5px", fontSize: "16px", marginRight: "10px" }}
        />
        <button onClick={focusInput}>Focus Input</button>
      </div>

      {/* Example 2: Render Count */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#e8f4f8" }}>
        <h2>2. Count Renders (Without Causing Re-render)</h2>
        <p>This component has rendered: <strong>{renderCount.current}</strong> times</p>
        <p>State count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment (causes re-render)</button>
        <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
          Notice: renderCount updates without triggering a re-render!
        </p>
      </div>

      {/* Example 3: Previous Value */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#fff3e0" }}>
        <h2>3. Store Previous Value</h2>
        <p>Current count: <strong>{count}</strong></p>
        <p>Previous count: <strong>{prevCountRef.current ?? "N/A"}</strong></p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)} style={{ marginLeft: "5px" }}>Decrement</button>
      </div>

      {/* Example 4: Timer */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#f3e5f5" }}>
        <h2>4. Timer (Store Interval ID)</h2>
        <p style={{ fontSize: "32px", fontWeight: "bold" }}>{seconds} seconds</p>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={resetTimer} style={{ marginLeft: "5px" }}>Reset</button>
      </div>

      {/* Example 5: Scroll to Element */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#c8e6c9" }}>
        <h2>5. Scroll to Element</h2>
        <button onClick={scrollToSection}>Scroll to Target Section</button>
      </div>

      {/* Spacer */}
      <div style={{ height: "100vh", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: "24px" }}>↓ Scroll down ↓</p>
      </div>

      {/* Target Section */}
      <div 
        ref={sectionRef}
        style={{ padding: "40px", background: "yellow", textAlign: "center" }}
      >
        <h2>🎯 Target Section</h2>
        <p>You scrolled here using useRef!</p>
      </div>

      {/* Summary */}
      <div style={{ marginTop: "30px", padding: "15px", background: "#ffecb3" }}>
        <h2>useRef vs useState</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #333", padding: "10px" }}>Feature</th>
              <th style={{ border: "1px solid #333", padding: "10px" }}>useState</th>
              <th style={{ border: "1px solid #333", padding: "10px" }}>useRef</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #333", padding: "10px" }}>Triggers re-render</td>
              <td style={{ border: "1px solid #333", padding: "10px" }}>✅ Yes</td>
              <td style={{ border: "1px solid #333", padding: "10px" }}>❌ No</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #333", padding: "10px" }}>Persists across renders</td>
              <td style={{ border: "1px solid #333", padding: "10px" }}>✅ Yes</td>
              <td style={{ border: "1px solid #333", padding: "10px" }}>✅ Yes</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #333", padding: "10px" }}>Use for</td>
              <td style={{ border: "1px solid #333", padding: "10px" }}>UI state</td>
              <td style={{ border: "1px solid #333", padding: "10px" }}>DOM refs, timers, prev values</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UseRefExample;
