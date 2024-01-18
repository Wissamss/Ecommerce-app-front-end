import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CartService from '../Services/CartService';
import CartItems from './CartItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchCartItems = async () => {
      const cart = await CartService.GetByID(id);
      setCartItems(cart.cartItems);
    };

    fetchCartItems();
  }, [id]);

  const handleDelete = async (itemID) => {
    const response = await CartService.DeleteItem(id, itemID);
    console.log(response);
    setCartItems((cartItems) => cartItems.filter((item) => item.id !== itemID));
  };

  const handleConfirmOrder = async () => {
    const response = await CartService.PurchaseItems(id);
    console.log(response);
  };

  return (
    <div>
      <h1>
        Your Cart <FontAwesomeIcon icon={faShoppingCart} style={{ color: 'orange' }} />
      </h1>
      <CartItems cartItems={cartItems} onDelete={handleDelete} onConfirm={handleConfirmOrder} />
    </div>
  );
};

export default Cart;
