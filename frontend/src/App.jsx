import { useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append('image', image);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
     

      const response = await axios.post('http://localhost:5000/users', formData);


      

      if (response.ok) {
        setMessage('User registered successfully!');
        setUsername('');
        setEmail('');
        setPassword('');
        setImage('');
      
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
        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
