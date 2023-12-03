import React, { useState } from 'react';
import ProductService from '../Services/ProductService';

const AddProduct = () => {
  const [file, setFile] = useState(null);
  const [designation, setDesignation] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');

  const categories = ['Clothes', 'Beauty', 'Jewelery', 'Other'];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('designation', designation);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('category', category);

    try {
      const response = await ProductService.AddProduct(formData);
      console.log('Product saved:', response.data);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Designation:</label>
        <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Category:</label>
        {categories.map((cat) => (
          <div key={cat}>
            <input
              type="radio"
              id={cat}
              value={cat}
              checked={category === cat}
              onChange={() => setCategory(cat)}
            />
            <label htmlFor={cat}>{cat}</label>
          </div>
        ))}
      </div>
      <div>
        <label>Image:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button type="submit">Save Product</button>
    </form>
  );
};

export default AddProduct;
