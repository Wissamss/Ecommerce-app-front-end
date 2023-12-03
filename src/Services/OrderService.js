import axios from 'axios';

const API_URL = 'http://localhost:8084/api/orders';

class OrderService {
  
    async GetAllOrders(){
    try{
        const response = await axios.get(API_URL);
        if(response.status === 200){
            return response.data;
        }

    }catch(e){
      console.error('Error fetching orders',e);
    }
    }

    async GetByCustomer(customerID){
        try{
            const response = await axios.get(API_URL + `/customer/${customerID}`);
            if (response.status === 200){
                return response.data;
            }
        }catch(e){
            console.error('Error fetching orders',e);
        }
    }

    async UpdateStatus(orderID, status){
        try{
            const response = await axios.put(API_URL + `/${orderID}`, {status});
            if (response.status === 200){
                return response.data;
            }
        }catch(e){
            console.error('Updating status failed',e);
        }
    }

    async DeleteOrder(orderID){
        try{
            const response = await axios.delete(API_URL + `/${orderID}`);
            if(response.status === 200){
                console.log('Order deleted successfully');
            }
        }catch(e){
            console.error('Deleting order failed',e);
        }
    }

    async GetOrderItems(orderID){
        try{
            const response = await axios.get(API_URL + `/${orderID}/items`);
            if (response.status === 200){
                return response.data;
            }
        }catch(e){
            console.error('Error fetching order items',e);
        }  
    }

}

export default new OrderService()