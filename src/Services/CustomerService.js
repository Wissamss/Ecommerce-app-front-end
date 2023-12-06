import axios from 'axios';

const API_URL = 'http://localhost:8080/api/customers';

class CustomerService {

    async Register(customer) {
        const response = await axios.post(API_URL, customer);
        return response;
    }

    async GetAll(){
        const response = await axios.get(API_URL);
        return response;
    }

    async GetUser(userID) {
        const response = await axios.get(API_URL + `/${userID}`);
        return response;
    }

    async UpdateUser(userID, user){
        const response = await axios.put(API_URL + `/${userID}`, user)
        return response;
    }

    async DeleteCustomer(userID){
        const response = await axios.delete(API_URL + `/${userID}`)
        return response;
    }

}

export default new CustomerService();
