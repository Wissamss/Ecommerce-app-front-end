import React, { useState, useEffect } from 'react'
import ProductService from '../Services/ProductService';
import {useNavigate, useParams} from 'react-router-dom';


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
        try {
            const fetchData = async () => {
              const response = await ProductService.GetByID(id);
              console.log("Product details:",response);
              if (response.status === 200) {
                setProduct(response.data);
              }
            };
        
            fetchData();
        }catch(e){
            console.error('Error fetching product data:', e)
        }
    
      }, [id]);
    
      const handleSaveClick = async() => {
        try{
        const response = await ProductService.EditProduct(id, product)
        if( response.status === 200){
            console.log('Update success');
            setProduct(response.data);
            navigate('/products');
        }
        }catch(e){
        console.error("update error", e);
        }
      };
    
      const handleChange = (e) => {
        setProduct({
          ...product,
          [e.target.name]: e.target.value,
        });
      };

      const categoryOptions = ['Clothes', 'Beauty', 'Jewelery', 'Other']

      const handleCategoryChange = (selectedCategory) => {
        setProduct({
          ...product,
          category: selectedCategory,
        });
      };
    
      return (
        <div>
          <h2>Product</h2>
          {product && (
            <form>
            <img src={`data:image/jpeg;base64,${product.image}`} alt={product.designation}  style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }} />
              <label>
                Designation:
                <input
                  type="text"
                  name="designation"
                  value={product.designation}
                  onChange={handleChange}
                />
              </label>
              <label>
                Price
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </label>
              <label>
                Quantity
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleChange}
                />
              </label>
              <label>
                Category
                <div>
                {categoryOptions.map((categoryOption) => (
                <label key={categoryOption}>
                <input
                  type="radio"
                  name="category"
                  value={categoryOption}
                  checked={product.category === categoryOption}
                  onChange={() => handleCategoryChange(categoryOption)}
                />
                {categoryOption}
              </label>
            ))}
          </div>
              </label>
              <button type="button" onClick={handleSaveClick}>
                Save
              </button>
            </form>
          )}
        </div>
      );
  
}

export default EditProduct