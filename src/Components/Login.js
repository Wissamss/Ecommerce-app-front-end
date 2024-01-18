import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { jwtDecode } from 'jwt-decode';

import loginImage from '../images/login1.png'; // Remplacez avec le chemin de votre image

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await AuthService.login(email, password);

      if (response.status === 200) {
        const decodedToken = jwtDecode(response.data.token);
        const userId = decodedToken.sub;
        const userRole = decodedToken.role;

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userID', userId);
        localStorage.setItem('role', userRole);

        if (userRole[0] === 'CUSTOMER') {
          navigate('/home');
        } else {
          navigate('/admindashboard');
        }
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img src={loginImage} alt="Login" style={styles.image} />
      </div>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <div style={styles.registerLink}>
          Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
        </div>
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
    textAlign: 'center',
  },
  image: {
    width: '90%',
    height: 'auto',
  },
  formContainer: {
    flex: '1',
    textAlign: 'left',
    marginLeft: '60px',
    marginTop: '90px',
    
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginLeft: '-120px'
    
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
  registerLink: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#333',
    marginLeft: '-30px'
    
  },
  link: {
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default Login;
