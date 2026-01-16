import React from "react";

// Child component that receives props
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Better way: Destructure props
function UserCard({ name, age, city, occupation }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
      <p>Occupation: {occupation}</p>
    </div>
  );
}

// Component with children prop
function Card({ children }) {
  return (
    <div style={{ border: "2px solid blue", padding: "15px", margin: "10px" }}>
      {children}
    </div>
  );
}

// Main component
function PropsExample() {
  return (
    <div>
      <h1>Props Examples</h1>
      
      {/* Basic props */}
      <Greeting name="Ashish" />
      <Greeting name="Teju" />
      
      {/* Multiple props */}
      <UserCard 
        name="Tejasvini Malviya" 
        age={25} 
        city="Mumbai" 
        occupation="Developer" 
      />
      
      <UserCard 
        name="Ashish Kumar" 
        age={28} 
        city="Delhi" 
        occupation="Designer" 
      />
      
      {/* Children prop */}
      <Card>
        <h3>This is inside a card</h3>
        <p>All content between Card tags is passed as children prop</p>
      </Card>
    </div>
  );
}

export default PropsExample;
