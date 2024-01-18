import React, { useState, useEffect } from 'react';
import ProductService from '../Services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    designation: '',
    price: 0,
    category: '',
    image: '',
    quantity: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.GetByID(id);
        console.log('Product details:', response);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (e) {
        console.error('Error fetching product data:', e);
      }
    };

    fetchData();
  }, [id]);

  const handleSaveClick = async () => {
    try {
      const response = await ProductService.EditProduct(id, product);
      if (response.status === 200) {
        console.log('Update success');
        setProduct(response.data);
        navigate('/products');
      }
    } catch (e) {
      console.error('Update error', e);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const categoryOptions = ['Clothes', 'Beauty', 'Jewelry', 'Other'];

  const handleCategoryChange = (selectedCategory) => {
    setProduct({
      ...product,
      category: selectedCategory,
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        <FontAwesomeIcon icon={faEdit} style={styles.icon} />
        Edit Product
      </h2>
      {product && (
        <form style={styles.form}>
          <img
            src={`data:image/jpeg;base64,${product.image}`}
            alt={product.designation}
            style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px', marginBottom: '15px' }}
          />
          <label style={styles.label}>
            Designation:
            <input
              type="text"
              name="designation"
              value={product.designation}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Price
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Quantity
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Category
            <div style={{ display: 'flex', marginTop: '5px' }}>
              {categoryOptions.map((categoryOption) => (
                <label key={categoryOption} style={styles.categoryLabel}>
                  <input
                    type="radio"
                    name="category"
                    value={categoryOption}
                    checked={product.category === categoryOption}
                    onChange={() => handleCategoryChange(categoryOption)}
                    style={styles.radioInput}
                  />
                  {categoryOption}
                </label>
              ))}
            </div>
          </label>
          <button type="button" onClick={handleSaveClick} style={styles.saveButton}>
            <FontAwesomeIcon icon={faSave} style={styles.saveIcon} />
            Save
          </button>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '330px', // Ajout de la limite de largeur
    margin: '0 auto',
  },

  header: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '60px', // Aligner à gauche
  },

  icon: {
    marginRight: '10px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
  },

  label: {
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'column',
  },

  input: {
    marginTop: '5px',
    padding: '5px',
  },

  categoryLabel: {
    marginRight: '15px',
    display: 'flex',
    alignItems: 'center',
  },

  radioInput: {
    marginRight: '5px',
  },

  saveButton: {
    backgroundColor: '#5cb85c',
    color: '#fff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    width: '120px',
    borderRadius: '5px',
  },

  saveIcon: {
    marginRight: '10px',
  },
};

export default EditProduct;
