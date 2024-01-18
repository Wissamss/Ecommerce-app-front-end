import React, { useState, useEffect } from 'react';
import ProductService from '../Services/ProductService';
import CartService from '../Services/CartService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

const CartItems = ({ cartItems, onDelete, onConfirm }) => {
  const [itemQuantities, setItemQuantities] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productDetails = await Promise.all(
        cartItems.map(async (item) => {
          const response = await ProductService.GetByID(item.productId);
          if (response.status === 200) {
            return response.data;
          }
          return null;
        })
      );
      setProducts(productDetails);
    };

    fetchProducts();
  }, [cartItems]);

  const handleEdit = async (itemID) => {
    const cart = await CartService.GetByCustomerID();
    const item = cartItems.find((item) => item.id === itemID);

    if (item) {
      const updatedItem = { ...item, quantity: itemQuantities[itemID] || 0 };
      const response = await CartService.UpdateItem(cart.id, itemID, updatedItem);
      console.log(response.cartItems);
    }
  };

  const handleQuantityChange = (itemID, newQuantity) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemID]: newQuantity,
    }));
  };

  return (
    <div>
      {cartItems ? (
        <table style={{ width: '100%', borderSpacing: '0' }}>
          <thead>
            <tr>
              <th style={{ paddingRight: '5px', paddingBottom: '5px' }}>Product Image</th>
              <th style={{ paddingRight: '5px', paddingBottom: '5px' }}>Product Name</th>
              <th style={{ paddingRight: '5px', textAlign: 'center', paddingBottom: '5px' }}>Quantity</th>
              <th style={{ paddingRight: '5px', paddingBottom: '5px' }}>Total Price</th>
              <th style={{ paddingRight: '5px', paddingBottom: '5px' }}>Edit</th>
              <th style={{ paddingBottom: '5px' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id}>
                <td style={{ paddingRight: '5px', paddingBottom: '5px' }}>
                  <img
                    src={`data:image/jpeg;base64,${products[index]?.image}`}
                    alt={products[index]?.productName}
                    style={{ maxWidth: '80px', height: '80px' }}
                  />
                </td>
                <td style={{ paddingRight: '5px', paddingBottom: '5px' }}>{products[index]?.designation}</td>
                <td style={{ paddingRight: '5px', textAlign: 'center', paddingBottom: '5px' }}>
                  <input
                    type="number"
                    value={itemQuantities[item.id] || item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                  />
                </td>
                <td style={{ paddingRight: '5px', paddingBottom: '5px' }}>{item.totalPrice}DH</td>
                <td style={{ paddingRight: '5px', paddingBottom: '5px' }}>
                  <button
                    onClick={() => handleEdit(item.id)}
                    style={{
                      backgroundColor: '#3498db',
                      color: '#fff',
                      borderRadius: '5px',
                      border: '1px solid #3498db',
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    Edit
                  </button>
                </td>
                <td style={{ paddingBottom: '5px' }}>
                  <button
                    onClick={() => onDelete(item.id)}
                    style={{
                      backgroundColor: '#e74c3c',
                      color: '#fff',
                      borderRadius: '5px',
                      border: '1px solid #e74c3c',
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in the cart.</p>
      )}
      <button
        onClick={onConfirm}
        style={{
          backgroundColor: '#2ecc71',
          color: '#fff',
          borderRadius: '5px',
          border: '1px solid #2ecc71',
          marginTop: '10px',
          float: 'right',
          marginRight: '70px',
        }}
      >
        <FontAwesomeIcon icon={faCheck} />
        Confirm Order
      </button>
    </div>
  );
};

export default CartItems;
