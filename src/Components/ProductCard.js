import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartService from '../Services/CartService';

const ProductCard = ({ product, isAdmin, onDelete }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    const userID = localStorage.getItem('userID');
    const cart = await CartService.GetByCustomerID(userID);
    const item = {
      productId: product.id,
      quantity: quantity,
    };
    const purchase = await CartService.AddItem(cart.id, item);
    console.log(`Product added to cart: ${product.designation} with Quantity: ${quantity}`);
  };

  return (
    <div className="product-card" style={styles.productCard}>
      <img
        src={`data:image/jpeg;base64,${product.image}`}
        alt={product.designation}
        style={styles.productImage}
      />
      <h3>{product.designation}</h3>
      <p>Price: {product.price}DH</p>
      {isAdmin ? (
        <div style={styles.adminControls}>
          <p>Quantity: {product.quantity}</p>
          <Link to={`/edit/${product.id}`}>
            <button style={styles.editButton}>
              <FontAwesomeIcon icon={faEdit} style={styles.buttonIcon} /> Edit
            </button>
          </Link>
          <button style={styles.deleteButton} onClick={() => onDelete(product.id)}>
            <FontAwesomeIcon icon={faTrashAlt} style={styles.buttonIcon} /> Delete
          </button>
        </div>
      ) : (
        <div style={styles.userControls}>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
            style={styles.quantityInput}
          />
          <button style={styles.addToCartButton} onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faShoppingCart} style={styles.buttonIcon} /> Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  productCard: {
    width: '100%',
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },

  productImage: {
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '200px',
  },

  adminControls: {
    marginTop: '10px',
  },

  userControls: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
  },

  quantityInput: {
    width: '50px',
    marginRight: '10px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },

  editButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },

  deleteButton: {
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius:'5px'
  },

  addToCartButton: {
    backgroundColor: '#ff7f00',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft:'150px',
  },

  buttonIcon: {
    marginRight: '5px',
  },
};

export default ProductCard;
