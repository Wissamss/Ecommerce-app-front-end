import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductService from '../Services/ProductService';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const isAdmin = localStorage.getItem("role") === 'ADMIN';
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleDelete = async (productID) => {
    try{
      const response = await ProductService.DeleteProduct(productID);
      if(response.status === 200){
        console.log('Product deleted successfully');
      }
    }catch(e){
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

  return (
    <div className="product-list-container">

      <div className="search-container">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={handleSearch}
          />
      </div>

      <div className="filter-container">
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

      {isAdmin && (
        <div className="add-product-container">
          <Link to="/product">
            <button>Add a Product</button>
          </Link>
        </div>
      )}

      <div className="product-cards-container">
      {searchedProducts.map(product => (
        <ProductCard key={product.id} product={product} isAdmin={isAdmin} onDelete={handleDelete} />
      ))}
      </div>

    </div>
  );
};

export default ProductList;
