import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth';

class AuthService {

    async login(email, password) {
        const response = await axios.post(API_URL, {
            email,
            password,
        });
        return response;
    }

}

export default new AuthService();
