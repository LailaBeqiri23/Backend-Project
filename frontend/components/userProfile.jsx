
// UserProfile.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users'); 
         
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

  }, []); 



  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/users/:id');
      console.log(response);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return (
    <div>
      {userData ? userData.map((user) => (
        <div key={user._id}>
          <h2>User Profile</h2>
          <img src={user.avatar} alt="User Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={(e) => handleDelete(e, user._id)}>X</button>
        </div>
      )): 
      (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
