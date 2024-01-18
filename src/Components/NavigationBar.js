import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import CartService from '../Services/CartService';
import iconImage from '../images/icon.png';
import centralImage from '../images/centralImage.jpg';
import leftImage from '../images/leftImage.jpg';

const NavigationBar = () => {
  const [cartID, setCartID] = useState(null);
  const isAdmin = localStorage.getItem('role') === 'ADMIN';
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    const fetchCartID = async () => {
      const cart = await CartService.GetByCustomerID(userID);
      setCartID(cart.id);
    };

    fetchCartID();
  }, [userID]);

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <img src={iconImage} alt="Logo" style={styles.logo} />
          <p style={styles.logoText}>Shop</p>
        </div>
        <Navbar style={styles.navbar}>
          <ul style={styles.navList}>
            {isAdmin && (
              <>
                <li style={styles.navItem}>
                  <Link to="/customers" className='nav-link' style={styles.navLink}>Users</Link>
                </li>
                <li style={styles.navItem}>
                  <Link to="/products" className='nav-link' style={styles.navLink}>Products</Link>
                </li>
                <li style={styles.navItem}>
                  <Link to="/orders" className='nav-link' style={styles.navLink}>Orders</Link>
                </li>
              </>
            )}
            {!isAdmin && (
              <>
                <li style={styles.navItem}>
                  <Link to="/products" className='nav-link' style={styles.navLink}>Products</Link>
                </li>
                <li style={styles.navItem}>
                  <Link to={`/cart/${cartID}`} className='nav-link' style={styles.navLink}>Cart</Link>
                </li>
                <li style={styles.navItem}>
                  <Link to="/orders" className='nav-link' style={styles.navLink}>Orders</Link>
                </li>
              </>
            )}
            <li style={styles.navItem}>
              <Link to="/profile" className='nav-link' style={styles.navLink}>Profile</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/logout" className='nav-link' style={styles.navLink}>Logout</Link>
            </li>
          </ul>
        </Navbar>
      </div>
      <div style={styles.centralContainer}>
        <div style={styles.imageContainer}>
          <img src={leftImage} alt="Left Image" style={styles.image} />
          <img src={centralImage} alt="Central Image" style={styles.centralImage} />
        </div>
        <p style={styles.centralText}>
          <span style={styles.italic}>Welcome</span> to {isAdmin ? <span style={styles.orangeText}>E-SHOP ⭐⭐⭐.</span> : <span style={styles.orangeText}>E-SHOP ⭐⭐⭐. Good Shopping!</span>}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 40,
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  logo: {
    width: '50px',
    height: 'auto',
    marginRight: '10px',
  },

  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },

  navbar: {
    padding: 0,
  },

  navList: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
  },

  navItem: {
    margin: '0 10px',
  },

  navLink: {
    textDecoration: 'none',
    color: '#495057',
    fontSize: '1rem',
    fontWeight: 'bold',
  },

  centralContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '140px',
  },
  
  centralText: {
    fontWeight: 'bold',
    marginBottom: '20px',
    marginTop: '-490px',
    textAlign: 'center',
    fontSize: '1.8rem',
  },

  orangeText: {
    color: 'orange',
    fontSize: '1.5rem',
  },

  italic: {
    fontStyle: 'italic',
  },

  centralImage: {
    width: '600px',
    height: 'auto',
    marginLeft: '20px',
  },

  imageContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '10px',
    marginTop: '40px',
  },

  image: {
    width: '600px',
    height: 'auto',
    marginRight: '20px',
  },
};

export default NavigationBar;
