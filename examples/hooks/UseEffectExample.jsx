import React, { useState, useEffect } from "react";

function UseEffectExample() {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Example 1: Run on every render
  useEffect(() => {
    console.log('Component rendered! Count is:', count);
  });

  // Example 2: Run only once (on mount)
  useEffect(() => {
    console.log('Component mounted!');
    setData({ message: 'Data loaded!' });
  }, []);

  // Example 3: Run when specific value changes
  useEffect(() => {
    if (searchTerm) {
      console.log('Searching for:', searchTerm);
    }
  }, [searchTerm]);

  // Example 4: Timer with cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(interval);
      console.log('Timer cleaned up!');
    };
  }, []);

  // Example 5: Window resize listener with cleanup
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Example 6: Document title update
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>useEffect Hook Examples</h1>

      {/* Example 1 & 6: Runs on every render + Updates title */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#f0f0f0" }}>
        <h2>1. Update on Every Render (check console)</h2>
        <p>Count: {count}</p>
        <p>(Also updates document title)</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>

      {/* Example 2: Run once on mount */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#e8f4f8" }}>
        <h2>2. Run Once on Mount</h2>
        <p>{data ? data.message : "Loading..."}</p>
      </div>

      {/* Example 3: Run when searchTerm changes */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#fff3e0" }}>
        <h2>3. Run When Search Term Changes</h2>
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search..."
          style={{ padding: "5px", fontSize: "16px" }}
        />
        <p>Searching for: {searchTerm || "(nothing)"}</p>
        <p style={{ fontSize: "12px", color: "#666" }}>Check console for search logs</p>
      </div>

      {/* Example 4: Timer with cleanup */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#f3e5f5" }}>
        <h2>4. Timer (with cleanup)</h2>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>Seconds: {seconds}</p>
      </div>

      {/* Example 5: Window resize */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#c8e6c9" }}>
        <h2>5. Window Resize Listener</h2>
        <p>Window Width: {windowWidth}px</p>
        <p style={{ fontSize: "12px", color: "#666" }}>Try resizing your browser window</p>
      </div>

      {/* Dependency Array Explanation */}
      <div style={{ padding: "15px", background: "#ffecb3" }}>
        <h2>useEffect Dependency Array Guide</h2>
        <ul>
          <li><code>useEffect(fn)</code> - Runs after every render</li>
          <li><code>useEffect(fn, [])</code> - Runs only once (on mount)</li>
          <li><code>useEffect(fn, [value])</code> - Runs when 'value' changes</li>
        </ul>
      </div>
    </div>
  );
}

export default UseEffectExample;
