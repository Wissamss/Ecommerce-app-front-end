import React, { useState, useEffect } from 'react';
import CustomerService from '../Services/CustomerService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faList} from '@fortawesome/free-solid-svg-icons';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CustomerService.GetAll();
        if (response.status === 200) {
          setCustomers(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    setLoading(true);
    try {
      const response = await CustomerService.DeleteCustomer(id);
      if (response.status === 200) {
        console.log("delete success");
        //setCustomers(customers.filter(customer => customer.id !== id));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }finally{
        setLoading(false);
    }

  };

  return (
    <div>
      <h2><FontAwesomeIcon icon={faList} />Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>address</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.address}</td>
              <td>{customer.email}</td>
              <td>
                <button size="sm" variant="outline-danger" onClick={() => handleDelete(customer.id)} disabled={loading}><FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
