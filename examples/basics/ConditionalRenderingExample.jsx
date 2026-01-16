import React, { useState } from "react";

function ConditionalRenderingExample() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("guest");
  const [messageCount, setMessageCount] = useState(3);
  const [status, setStatus] = useState("loading");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Conditional Rendering Examples</h1>
      
      {/* Method 1: Ternary Operator */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#f0f0f0" }}>
        <h2>1. Ternary Operator</h2>
        {isLoggedIn ? (
          <h3>Welcome back!</h3>
        ) : (
          <h3>Please sign in.</h3>
        )}
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>

      {/* Method 2: Logical && Operator */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#e8f4f8" }}>
        <h2>2. Logical AND (&&)</h2>
        <h3>You have {messageCount} messages</h3>
        {messageCount > 0 && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            You have unread messages!
          </p>
        )}
        <button onClick={() => setMessageCount(0)}>Clear Messages</button>
      </div>

      {/* Method 3: If-Else with Multiple Conditions */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#fff3e0" }}>
        <h2>3. Multiple Conditions (Status Messages)</h2>
        <StatusMessage status={status} />
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => setStatus("loading")}>Loading</button>
          <button onClick={() => setStatus("success")} style={{ marginLeft: "5px" }}>Success</button>
          <button onClick={() => setStatus("error")} style={{ marginLeft: "5px" }}>Error</button>
        </div>
      </div>

      {/* Method 4: Based on User Role */}
      <div style={{ marginBottom: "30px", padding: "15px", background: "#f3e5f5" }}>
        <h2>4. Role-Based Rendering</h2>
        {userRole === "admin" && (
          <div style={{ padding: "10px", background: "#ffeb3b" }}>
            <h3>Admin Panel</h3>
            <button>Manage Users</button>
            <button style={{ marginLeft: "5px" }}>View Reports</button>
          </div>
        )}
        
        {userRole === "user" && (
          <div style={{ padding: "10px", background: "#b3e5fc" }}>
            <h3>User Dashboard</h3>
            <p>Welcome, regular user!</p>
          </div>
        )}
        
        {userRole === "guest" && (
          <div style={{ padding: "10px", background: "#ffccbc" }}>
            <h3>Guest Access</h3>
            <p>Limited features available.</p>
          </div>
        )}
        
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => setUserRole("admin")}>Admin</button>
          <button onClick={() => setUserRole("user")} style={{ marginLeft: "5px" }}>User</button>
          <button onClick={() => setUserRole("guest")} style={{ marginLeft: "5px" }}>Guest</button>
        </div>
      </div>
    </div>
  );
}

// Separate component for status messages
function StatusMessage({ status }) {
  if (status === "loading") {
    return <p>⏳ Loading...</p>;
  }
  
  if (status === "error") {
    return <p style={{ color: "red" }}>❌ Error occurred!</p>;
  }
  
  if (status === "success") {
    return <p style={{ color: "green" }}>✅ Success!</p>;
  }
  
  return <p>Ready</p>;
}

export default ConditionalRenderingExample;
