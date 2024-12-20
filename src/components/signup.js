import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Signup () {
    const [Username, setName] = useState('');
    const [Password, setpassword] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        try {
          const response = await fetch('http://localhost:5000/signup', {  // Send POST request to /create
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Username,Password })
          });
            console.log(response);
    
          if (response.ok) {
            const data = await response.json(); // Get the returned users
            setMessage('User created successfully!'); // Display success message
            setpassword('');
          } else {
            // Handle errors (e.g., display an error message)
            const errorData = await response.text(); // Get error from server
            setMessage(`Error: ${errorData || response.statusText}`);
    
          }
        } catch (error) {
          console.error("Error:", error);
          setMessage("An error occurred during the request."); // Display error message for network issues, etc.
        }
      };
      return(
    <div>
        <h1>Create User</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Username">Username:</label>
            <input type="text" id="Username" value={Username} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="Password">Password:</label>
            <input type="password" id="Password" value={Password} onChange={e => setpassword(e.target.value)} required />
          </div>
          <button type="submit">Create</button>
        </form>
    </div>
      )
}

export default Signup;