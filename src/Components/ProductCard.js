import React, { useState} from 'react';
import {Link} from 'react-router-dom';
import CartService from '../Services/CartService';


const ProductCard = ({ product, isAdmin, onDelete}) => {

  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = async () => {
    const userID = localStorage.getItem('userID');
    const cart = await CartService.GetByCustomerID(userID);
    const item = {
      productId : product.id,
      quantity : quantity,
    }
    const purchase = await CartService.AddItem(cart.id, item);
    console.log(`Product added to cart: ${product.designation} with Quantity: ${quantity}`);
  };

  return (
    <div className="product-card">
      <img src={`data:image/jpeg;base64,${product.image}`} alt={product.designation}  style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }} />
      <h3>{product.designation}</h3>
      <p>Price: ${product.price}</p>
      {isAdmin ? ( 
        <div>
          <p>Quantity: {product.quantity}</p>
          <Link to={`/edit/${product.id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => onDelete(product.id)}>Delete</button>
        </div>) : (
      <div>
       <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
       />
      <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      )}
    </div>
  );
};

export default ProductCard;
