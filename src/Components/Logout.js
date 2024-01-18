import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <p style={styles.message}>Are you sure you want to log out?</p>
      <button style={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },

  message: {
    fontSize: '1.2rem',
    marginBottom: '20px',
    textAlign: 'center',
  },

  button: {
    padding: '10px 20px',
    background: '#dc3545', // Red color
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Logout;

