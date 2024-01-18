import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductService from '../Services/ProductService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUsers, faBox, faClipboardList, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import userImage from '../images/profile.png'; // Remplacez cela par le chemin réel de votre image utilisateur
import CartService from '../Services/CartService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const userRole = localStorage.getItem("role");
  const [cartID, setCartID] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const userName = userRole === 'ADMIN' ? 'Fatima Zahra' : 'Wissam Saidi';
  const userID = localStorage.getItem('userID');

  const categories = ['All', 'Clothes', 'Jewelery', 'Beauty'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.GetAll();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCartID = async () => {
      const cart = await CartService.GetByCustomerID(userID);
      setCartID(cart.id);
    };

    fetchCartID();
  }, [userID]);


  const handleDelete = async (productID) => {
    try {
      const response = await ProductService.DeleteProduct(productID);
      if (response.status === 200) {
        console.log('Product deleted successfully');
      }
    } catch (e) {
      console.error("Error deleting product", e);
    }
    setProducts((products) => products.filter((p) => p.id !== productID));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase());

  const searchedProducts =
    searchTerm.trim() === ''
      ? filteredProducts
      : filteredProducts.filter((product) =>
          product.designation.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const isAdmin = userRole === 'ADMIN';

  const userMenu = isAdmin ? (
    <>
      <Link to="/users" style={styles.menuItem}><FontAwesomeIcon icon={faUsers} style={styles.menuIcon} /> Users</Link>
      <Link to="/products" style={styles.menuItem}><FontAwesomeIcon icon={faBox} style={styles.menuIcon} /> Products</Link>
      <Link to="/orders" style={styles.menuItem}><FontAwesomeIcon icon={faClipboardList} style={styles.menuIcon} /> Orders</Link>
      <Link to="/profile" style={styles.menuItem}><FontAwesomeIcon icon={faUserCircle} style={styles.menuIcon} /> Profile</Link>
      <Link to="/logout" style={styles.menuItem}><FontAwesomeIcon icon={faSignOutAlt} style={styles.menuIcon} /> Logout</Link>
    </>
  ) : (
    <>
      <Link to="/products" style={styles.menuItem}><FontAwesomeIcon icon={faBox} style={styles.menuIcon} /> Products</Link>
      <Link to={`/cart/${cartID}`} style={styles.menuItem}><FontAwesomeIcon icon={faShoppingCart} style={styles.menuIcon} /> Cart</Link>
      <Link to="/orders" style={styles.menuItem}><FontAwesomeIcon icon={faClipboardList} style={styles.menuIcon} /> Orders</Link>
      <Link to="/profile" style={styles.menuItem}><FontAwesomeIcon icon={faUserCircle} style={styles.menuIcon} /> Profile</Link>
      <Link to="/logout" style={styles.menuItem}><FontAwesomeIcon icon={faSignOutAlt} style={styles.menuIcon} /> Logout</Link>
    </>
  );

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        {/* L'image remplace l'icône d'utilisateur */}
        <img src={userImage} alt="User" style={styles.userImage} />
        <p style={styles.userName}>{userName}</p>
        <ul style={styles.menu}>
          {/* Icone Users reste */}
          {userMenu}
        </ul>
      </div>
      <div style={styles.content}>
        <h2 style={styles.title}>Product List</h2>
        <div style={styles.topContainer}>
          <div style={styles.searchContainer}>
            <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={handleSearch}
              style={styles.searchInput}
            />
          </div>
          {isAdmin && (
            <div style={styles.addProductContainer}>
              <Link to="/product">
                <button style={styles.addButton}>Add a Product</button>
              </Link>
            </div>
          )}
        </div>
        <div style={styles.filterContainer}>
          <h3>Filter by Category</h3>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <input
                  type="radio"
                  id={category}
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={category}>{category}</label>
              </li>
            ))}
          </ul>
        </div>
        <div style={styles.productCardsContainer}>
          {searchedProducts.map((product, index) => (
            <div key={product.id} style={styles.productCard}>
              <ProductCard product={product} isAdmin={isAdmin} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
  },

  sidebar: {
    width: '200px',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
    height: '100vh',
  },

  menu: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },

  menuItem: {
    marginBottom: '10px',
    textDecoration: 'none',
    color: '#333',
    display: 'block',
    padding: '8px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },

  menuIcon: {
    marginRight: '10px',
  },

  userImage: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
  },

  userName: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#333',
  },

  content: {
    flex: '1',
    padding: '20px',
  },

  title: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },

  topContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },

  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '70%',
    marginLeft:'80px'
  },

  searchIcon: {
    marginRight: '10px',
  },

  searchInput: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },

  addProductContainer: {
    marginLeft: '20px',
  },

  addButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },

  filterContainer: {
    marginBottom: '20px',
  },

  productCardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  productCard: {
    width: '30%',
    margin: '0 1.5% 20px 0',
  },
};

export default ProductList;
