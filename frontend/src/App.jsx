import { useState } from 'react'

import './App.css'

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('User registered successfully!');
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        setMessage(data.message || 'Failed to register user');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to register user');
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleRegister}>
        <input type="text" name="username" placeholder="Username" value={username} onChange={handleUsernameChange} />
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
