import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await AuthService.login(email, password);

            if (response.status === 200) {

                const decodedToken = jwtDecode(response.data.token);
                const userId = decodedToken.sub;
                const userRole = decodedToken.role;

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userID', userId);
                localStorage.setItem('role', userRole); 

                if (userRole[0] === "CUSTOMER"){
                    navigate('/home');
                }else{
                    navigate('/admindashboard')
                }               
            }
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <div>{error}</div>}
                <button type="submit">Login</button>
            </form>
            <div>
            Don't have an account? <Link to="/register">Register here</Link>
            </div>
        </div>
    );
};

export default Login;