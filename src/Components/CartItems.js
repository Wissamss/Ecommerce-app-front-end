import React, { useState, useEffect } from 'react';
import ProductService from '../Services/ProductService';
import CartService from '../Services/CartService';

const CartItems = ({ cartItems, onDelete, onConfirm}) => {
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
    console.log(cart.id);
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
        <table>
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={`data:image/jpeg;base64,${products[index]?.image}`}
                    alt={products[index]?.productName}
                    style={{ maxWidth: '80px', height: '80px' }}
                  />
                </td>
                <td>{products[index]?.designation}</td>
                <td>
                  <input
                    type="number"
                    value={itemQuantities[item.id] || item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                  />
                </td>
                <td>{item.totalPrice}$</td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => onDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in the cart.</p>
      )}
      <button onClick={onConfirm}>Confirm Order</button>
    </div>
  );
};

export default CartItems;
