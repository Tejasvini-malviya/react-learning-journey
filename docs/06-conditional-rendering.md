# 📘 Conditional Rendering

## What is Conditional Rendering?

**Conditional rendering** means showing different content based on certain conditions. It's like an if-else statement for your UI - you decide what to display based on the current state or props.

## 🎯 Why Use Conditional Rendering?

- Show/hide elements based on user actions
- Display different content for different user roles
- Show loading states while data is being fetched
- Display error messages when something goes wrong
- Toggle between different views

## 🔀 Methods of Conditional Rendering

React provides several ways to conditionally render components:

### 1️⃣ If-Else Statement

Use regular if-else inside the function, before the return statement.

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please sign in.</h1>;
  }
}
```

### 2️⃣ Ternary Operator (? :)

The most common method. Clean and concise for simple conditions.

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign in.</h1>
      )}
    </div>
  );
}
```

**Syntax:**
```jsx
{condition ? <ComponentIfTrue /> : <ComponentIfFalse />}
```

### 3️⃣ Logical && Operator

Use when you only want to show something if a condition is true (no "else" needed).

```jsx
function Mailbox({ unreadMessages }) {
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}
```

**Syntax:**
```jsx
{condition && <Component />}
```

**How it works:**
- If condition is `true`, component is rendered
- If condition is `false`, nothing is rendered

### 4️⃣ Early Return

Return early from the function to handle special cases.

```jsx
function UserProfile({ user }) {
  // Early return if user is null
  if (!user) {
    return <p>Loading user data...</p>;
  }
  
  // Early return for error case
  if (user.error) {
    return <p>Error loading user!</p>;
  }

  // Normal render
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

## 📝 Practical Examples

### Example 1: Login/Logout Button

```jsx
import React, { useState } from 'react';

function LoginControl() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={() => setIsLoggedIn(false)}>
          Logout
        </button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>
          Login
        </button>
      )}
      
      <p>User is {isLoggedIn ? 'logged in' : 'logged out'}</p>
    </div>
  );
}
```

### Example 2: Loading State

```jsx
function DataDisplay() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  // Simulate data fetch
  useEffect(() => {
    setTimeout(() => {
      setData({ name: 'Product', price: 99 });
      setIsLoading(false);
    }, 2000);
  }, []);

  // Early return for loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <p>Price: ${data.price}</p>
    </div>
  );
}
```

### Example 3: User Permissions

```jsx
function Dashboard({ user }) {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Show admin panel only for admins */}
      {user.role === 'admin' && (
        <div className="admin-panel">
          <h2>Admin Controls</h2>
          <button>Manage Users</button>
        </div>
      )}
      
      {/* Show different content based on subscription */}
      {user.isPremium ? (
        <PremiumContent />
      ) : (
        <FreeContent />
      )}
    </div>
  );
}
```

### Example 4: Error Handling

```jsx
function UserForm() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    // Validation logic
    if (!email) {
      setError('Email is required');
      return;
    }
    
    setSuccess(true);
    setError(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
      
      {/* Show error if exists */}
      {error && (
        <div className="error">{error}</div>
      )}
      
      {/* Show success message */}
      {success && (
        <div className="success">Form submitted successfully!</div>
      )}
    </div>
  );
}
```

### Example 5: Multiple Conditions

```jsx
function StatusMessage({ status }) {
  // Using if-else for multiple conditions
  if (status === 'loading') {
    return <p>⏳ Loading...</p>;
  }
  
  if (status === 'error') {
    return <p>❌ Error occurred!</p>;
  }
  
  if (status === 'success') {
    return <p>✅ Success!</p>;
  }
  
  return <p>Ready to start</p>;
}

// Alternative: Using switch statement
function StatusMessageSwitch({ status }) {
  switch(status) {
    case 'loading':
      return <p>⏳ Loading...</p>;
    case 'error':
      return <p>❌ Error occurred!</p>;
    case 'success':
      return <p>✅ Success!</p>;
    default:
      return <p>Ready to start</p>;
  }
}
```

## 🎯 Choosing the Right Method

| Method | When to Use | Example |
|--------|-------------|---------|
| **If-Else** | Complex logic, multiple returns | User authentication flow |
| **Ternary** | Simple two-way choice | Show/hide password |
| **&&** | Show something only if true | Display notifications |
| **Early Return** | Handle edge cases first | Loading/error states |

## ✅ Best Practices

### 1. Keep It Simple
```jsx
// ✅ Good - Simple and clear
{isLoggedIn && <WelcomeMessage />}

// ❌ Avoid - Too complex
{isLoggedIn && userType === 'premium' && !isExpired && hasPermission && (
  <PremiumFeature />
)}

// ✅ Better - Use a variable
const canShowFeature = isLoggedIn && userType === 'premium' && !isExpired && hasPermission;
{canShowFeature && <PremiumFeature />}
```

### 2. Use Descriptive Variable Names
```jsx
// ✅ Good
const hasUnreadMessages = messages.length > 0;
{hasUnreadMessages && <MessageAlert />}

// ❌ Confusing
{messages.length > 0 && <MessageAlert />}
```

### 3. Avoid Nested Ternaries
```jsx
// ❌ Bad - Hard to read
{isLoggedIn ? (
  isPremium ? (
    <PremiumDashboard />
  ) : (
    <FreeDashboard />
  )
) : (
  <Login />
)}

// ✅ Better - Use if-else or separate component
function DashboardView({ isLoggedIn, isPremium }) {
  if (!isLoggedIn) return <Login />;
  if (isPremium) return <PremiumDashboard />;
  return <FreeDashboard />;
}
```

### 4. Handle Loading and Error States
```jsx
function UserData({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Always handle these three states
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <p>No user found</p>;

  return <UserProfile user={user} />;
}
```

## 🎓 Summary

| Technique | Syntax | Use Case |
|-----------|--------|----------|
| If-Else | `if (condition) { return <A /> } else { return <B /> }` | Complex logic |
| Ternary | `{condition ? <A /> : <B />}` | Simple two-way choice |
| Logical AND | `{condition && <Component />}` | Show only if true |
| Early Return | `if (!data) return <Loading />` | Handle edge cases |

### Key Takeaways:
- Conditional rendering lets you show different UI based on conditions
- Choose the right method for your use case
- Keep conditions simple and readable
- Always handle loading and error states
- Use descriptive variable names for complex conditions

---

**Previous:** [← State Lifting](05-state-lifting.md) | **Next:** [Event Handling →](07-event-handling.md)
