import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar} from 'react-bootstrap';
import CartService from '../Services/CartService';


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
    <Navbar>
        <ul>
        {isAdmin ? (
          <>
            <li><Link to="/customers" className='nav-link'>Users</Link></li>
            <li><Link to="/products" className='nav-link'>Products</Link></li>
            <li><Link to="/orders"className='nav-link'>Orders</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/products" className='nav-link'>Products</Link></li>
            <li><Link to={`/cart/${cartID}`} className='nav-link'>Cart</Link></li>
            <li><Link to="/orders" className='nav-link'>Orders</Link></li>
          </>
        )}
        <li><Link to="/profile" className='nav-link'>Profile</Link></li>
        <li><Link to="/logout" className='nav-link'>Logout</Link></li>
        </ul>
    </Navbar>
  );
};

export default NavigationBar;
