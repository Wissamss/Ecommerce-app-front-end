import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerService from '../Services/CustomerService';

const Registration = () => {
   
    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        email: '',
        password: '',
      });
      
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setCustomer({
            ...customer,
            [event.target.name]: event.target.value,
          });
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await CustomerService.Register(customer); 
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            setError('Email already exists');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" name= "firstName" value={customer.firstName} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name= "lastName" value={customer.lastName} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" name= "address" value={customer.address} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Phone Number :</label>
                    <input type="text" name= "phoneNumber" value={customer.phoneNumber} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name= "email" value={customer.email} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name= "password" value={customer.password} onChange={handleInputChange} required />
                </div>
                {error && <div>{error}</div>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registration;