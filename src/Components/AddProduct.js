import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
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
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>
        <FontAwesomeIcon icon={faPlusCircle} style={styles.icon} />
        Add New Product
      </h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>Designation:</label>
        <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} style={styles.input} />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={styles.input} />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={styles.input} />
      </div>
      <div style={{ ...styles.formGroup, flexDirection: 'row', display: 'flex' }}>
        <label style={styles.label}>Category:</label>
        <div style={{ display: 'flex', marginLeft: '10px' }}>
          {categories.map((cat) => (
            <div key={cat} style={{ ...styles.radioGroup, marginRight: '15px' }}>
              <input
                type="radio"
                id={cat}
                value={cat}
                checked={category === cat}
                onChange={() => setCategory(cat)}
                style={styles.radioInput}
              />
              <label htmlFor={cat} style={styles.radioLabel}>{cat}</label>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Image:</label>
        <input type="file" onChange={handleFileChange} style={styles.fileInput} />
      </div>
      <button type="submit" style={styles.submitButton}>
        <FontAwesomeIcon icon={faSave} style={styles.saveIcon} />
        Save Product
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '10px',
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    marginTop: '3px',
    marginBottom: '10px',
  },
  radioGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  radioInput: {
    marginRight: '5px',
  },
  radioLabel: {
    marginRight: '15px',
  },
  fileInput: {
    marginBottom: '10px',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  saveIcon: {
    marginRight: '10px',
  },
};

export default AddProduct;
