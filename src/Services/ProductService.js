import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

class ProductService {

    async AddProduct(product) {
        const response = await axios.post('http://localhost:8085/api/products', product, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        return response;
    }
    
    async DeleteProduct(productID){
        const response = await axios.delete(API_URL + `/${productID}`);
        return response;
    }

    async EditProduct(productID, product){
        const response = await axios.put(API_URL + `/${productID}`, product);
        return response;
    }

    async GetAll(){
        const response = await axios.get(API_URL);
        return response;
    }

    async GetByID(productID){
        const response = await axios.get(API_URL + `/${productID}`);
        return response
    }

}

export default new ProductService();
