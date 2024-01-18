import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerService from '../Services/CustomerService';

import registrationImage from '../images/login1.png'; // Remplacez avec le chemin de votre image

const Registration = () => {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await CustomerService.Register(customer);
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      setError('Email already exists');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        
        <img src={registrationImage} alt="Registration" style={styles.image} />
      </div>
      <div style={styles.formContainer}>
        <h2 style={styles.formHeading}>Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={customer.firstName}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={customer.lastName}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Address:</label>
            <input
              type="text"
              name="address"
              value={customer.address}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={customer.phoneNumber}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="text"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={customer.password}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    maxWidth: '900px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginTop: '50px',
  },
  imageContainer: {
    flex: '1',
    marginRight: '10px',
    marginTop: '40px',
    textAlign: 'center', // Aligner le texte au centre
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  image: {
    width: '90%',
    height: 'auto',
  },
  formContainer: {
    flex: '1',
    textAlign: 'left',
    marginLeft: '60px'
  },
  formHeading: {
    textAlign: 'center',
    color: '#333',
    marginLeft: '-70px'
  },
  form: {
    marginTop: '20px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    width: '80%', // Réduire la largeur des champs de saisie à 80%
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#33BEFF',
    color: 'white',
    padding: '6px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '80%'
   
  },
};

export default Registration;
