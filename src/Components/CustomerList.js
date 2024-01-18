import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomerService from '../Services/CustomerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faList, faBox, faClipboardList, faUserCircle, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

// Importez votre image ici
import userImage from '../images/profile.png'; // Remplacez avec le chemin correct

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
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        {/* L'image remplace l'icône d'utilisateur */}
        <img src={userImage} alt="User" style={styles.userImage} />
        <p style={styles.userName}>Fatima-Zahra</p>
        <ul style={styles.menu}>
          {/* Icone Users reste */}
          <li style={styles.menuItem}><FontAwesomeIcon icon={faUsers} style={styles.menuIcon} /> <Link to="/users">Users</Link></li>
          <li style={styles.menuItem}><FontAwesomeIcon icon={faBox} style={styles.menuIcon} /> <Link to="/products">Products</Link></li>
          <li style={styles.menuItem}><FontAwesomeIcon icon={faClipboardList} style={styles.menuIcon} /> <Link to="/orders">Orders</Link></li>
          <li style={styles.menuItem}><FontAwesomeIcon icon={faUserCircle} style={styles.menuIcon} /> <Link to="/profile">Profile</Link></li>
          <li style={styles.menuItem}><FontAwesomeIcon icon={faSignOutAlt} style={styles.menuIcon} /> <Link to="/logout">Logout</Link></li>
        </ul>
      </div>
      <div style={styles.content}>
        {/* Titre Users sans icône */}
        <h2 style={styles.title}>Users</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.header}>First Name</th>
              <th style={styles.header}>Last Name</th>
              <th style={styles.header}>Phone Number</th>
              <th style={styles.header}>Address</th>
              <th style={styles.header}>Email</th>
              <th style={styles.header}>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td style={styles.cell}>{customer.firstName}</td>
                <td style={styles.cell}>{customer.lastName}</td>
                <td style={styles.cell}>{customer.phoneNumber}</td>
                <td style={styles.cell}>{customer.address}</td>
                <td style={styles.cell}>{customer.email}</td>
                <td style={styles.cell}>
                  <button style={styles.deleteButton} onClick={() => handleDelete(customer.id)} disabled={loading}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
  },

  sidebar: {
    width: '200px',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
    height:'650px'
  },

  userImage: {
    width: '48px', // Taille de l'image
    height: '48px', // Taille de l'image
    borderRadius: '50%', // Pour rendre l'image circulaire
  },

  userName: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#333',
  },

  menu: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },

  menuItem: {
    marginBottom: '10px',
  },

  menuIcon: {
    marginRight: '10px',
  },

  content: {
    flex: '1',
  },

  title: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    marginLeft: '30px', // Ajout de la marge à gauche
    marginTop: '30px', // Ajout de la marge en haut
  },

  table: {
    width: '70%',
    margin: '0 auto', // Centre le tableau
    borderCollapse: 'collapse',
  },

  header: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#D7DCDE',
    textAlign: 'left',
  },

  cell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },

  deleteButton: {
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default CustomerList;
