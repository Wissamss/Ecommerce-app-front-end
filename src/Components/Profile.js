import React, { useState, useEffect } from 'react';
import CustomerService from '../Services/CustomerService';
import { faSave } from '@fortawesome/free-solid-svg-icons';

// Ajoutez l'importation nécessaire pour votre image
import profileImage from '../images/profile.png';

const Profile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: '',
  });

  const [editMode, setEditMode] = useState(false);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CustomerService.GetUser(userID);
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (e) {
        console.error('Error fetching user data:', e);
      }
    };

    fetchData();
  }, [userID]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await CustomerService.UpdateUser(userID, user);
      if (response.status === 200) {
        console.log('Update success');
        setUser(response.data);
      }
    } catch (e) {
      console.error('Update error', e);
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
    <div style={styles.container}>
      <h2 style={styles.header}>
        <img src={profileImage} alt="Profile" style={styles.profileImage} /> Profile
      </h2>
      {editMode ? (
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="button" onClick={handleSaveClick} style={styles.saveButton}>
            Save
          </button>
        </form>
      ) : (
        <div style={styles.infoContainer}>
          <p>
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.phoneNumber}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button style={styles.editButton} onClick={handleEditClick}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },

  header: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center', // Aligner l'image et le texte horizontalement
  },

  profileImage: {
    width: '50px', // Ajustez la taille de l'image selon vos besoins
    height: '50px', // Ajustez la taille de l'image selon vos besoins
    marginRight: '10px', // Espace entre l'image et le texte
  },

  infoContainer: {
    marginBottom: '20px',
  },

  editButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginBottom: '10px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
  },

  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },

  label: {
    marginBottom: '5px',
    color: '#555',
  },

  input: {
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    marginTop: '5px',
  },

  saveButton: {
    backgroundColor: '#5cb85c',
    color: '#fff',
    border: 'none',
    padding: '5px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '10px',
  },
};

export default Profile;
