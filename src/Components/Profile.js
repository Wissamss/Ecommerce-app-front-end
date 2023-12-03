import React, { useState, useEffect } from 'react';
import CustomerService from '../Services/CustomerService';

const Profile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    address : '',
    phoneNumber : '',
    email: '',
  });

  const [editMode, setEditMode] = useState(false);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    try {
        const fetchData = async () => {
          const response = await CustomerService.GetUser(userID);
          if (response.status === 200) {
            setUser(response.data);
          }
        };
    
        fetchData();
    }catch(e){
        console.error('Error fetching user data:', e)
    }

  }, [userID]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async() => {
    try{
    const response = await CustomerService.UpdateUser(userID, user)
    if( response.status === 200){
        console.log('Update success');
        setUser(response.data);
    }
    }catch(e){
    console.error("update error", e);
    }
    setEditMode(false);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Profile</h2>
      {!editMode ? (
        <div>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Address: {user.address}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      ) : (
        <form>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </label>
          <button type="button" onClick={handleSaveClick}>
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
