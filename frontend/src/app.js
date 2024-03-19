// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('/api/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ username: '', email: '', password: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} - {user.email}
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input type="text" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} placeholder="Username" />
      <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="Email" />
      <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} placeholder="Password" />
      <button onClick={handleCreateUser}>Add User</button>
    </div>
  );
}

export default App;
