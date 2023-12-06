import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cart';

class CartService {

    async AddItem(cartID, item){
        try{
        const response = await axios.post(API_URL + `/${cartID}/items`, item);
        if (response.status === 200){
            return response.data;
        }
    }catch(e){
        console.error('Adding item to cart failed', e);
    }
    }

    async UpdateItem(cartID, itemID, item){
        try{
            const response = await axios.put(API_URL + `/${cartID}/items/${itemID}`, item);
            if(response.status === 200){
                return response.data;
            }
        }catch(e){
            console.error('Updating item failed')
        }
    }

    async DeleteItem(cartID, itemID){
        try{
            const response = await axios.delete(API_URL + `/${cartID}/items/${itemID}`);
            if(response.status === 200){
                return "Item deleted successfully";
            }
        }catch(e){
            console.error('Deleting item failed',e)
        }
    }

    async PurchaseItems(cartID){
        try{
            const response = await axios.post(API_URL + `/${cartID}/complete`);
            if(response.status === 200){
                return response.data;
            }
        }catch(e){
            console.error('Purchasing failed',e);
        }
    }

    async GetByCustomerID(){
        const customerID = localStorage.getItem('userID');
        try{
            const response = await axios.get(API_URL + `/customer/${customerID}`);
            if (response.status === 200){
                return response.data;
            }
        }catch(e){
            console.log('Error fetching customer\'s cart',e);
        }
    }

    async GetByID(cartID){
        try{
            const response = await axios.get(API_URL + `/${cartID}`);
            if (response.status === 200){
                return response.data;
            }
        }catch(e){
            console.log('Error fetching cart items',e);
        }
    }

}

export default new CartService();
